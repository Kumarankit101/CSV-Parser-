import fs from "fs";
import readline from "readline";
import dotenv from "dotenv";
import path from "path";
import { insetUsersBatch, getAgeGroup } from "./database-storage.js";
import { parseLineToUser } from "./utils/utils.js";

dotenv.config();

// fetch csv path from env
let csv_path;
try {
  const __dirname = path.resolve();
  if (!process.env.CSV_PATH) {
    throw new Error("CSV_PATH is not found");
  }

  csv_path = path.join(__dirname, process.env.CSV_PATH);
  if (!fs.existsSync(csv_path)) {
    throw new Error("csv file not found ");
  }
} catch (error) {
  console.error("Error loading csv", error);
  process.exit(1);
}

// console.log(csv_path)

let headers = [];
let batch = [];
const BATCH_SIZE = 1000;

async function processCSV(csv_path) {
  try {
    const lineInterface = readline.createInterface({
      input: fs.createReadStream(csv_path),
    });

    let headerFlag = true;
    let processing = Promise.resolve();

    lineInterface.on("line", (line) => {
      //skiping first line
      if (headerFlag) {
        headers = line.split(",").map((header) => header.trim());
        console.log(headers);
        headerFlag = false;
        return;
      }

      const user = parseLineToUser(line, headers);
      // console.log("Line:", line, "\nUser:", JSON.stringify(user, null, 2))
      batch.push(user);
      // batch.push(line.split(",").map(line => line.trim()))
      // console.log(batch.length)

      if (batch.length >= BATCH_SIZE) {
        const currentBatch = batch.slice();
        batch = [];
        processing = processing.then(() => insetUsersBatch(currentBatch));
      }
      // console.log(batch.length)
    });

    lineInterface.on("close", async () => {
      await processing;
      //pusing remaining batch to db
      if (batch.length > 0) {
        await insetUsersBatch(batch);
        batch = [];
      }
      let distribution = await ageDistribution();
      console.log(distribution);
      process.exit(0);
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function ageDistribution() {
  const result = await getAgeGroup();
  // console.log(result.rows)
  const total = result.rows.reduce((sum, row) => sum + parseInt(row.count), 0);
  // console.log(total)

  const distribution = {};
  for (let row of result.rows) {
    let group = row.age_group;
    let percent = (row.count / total) * 100;
    distribution[group] = percent;
  }

  return distribution;
}

processCSV(csv_path);
console.log(headers);
