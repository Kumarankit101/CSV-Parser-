import pool from "./config/db.js";

export async function insetUsersBatch(users) {
  let client;
  try {
    client = await pool.connect();
    console.log("connected to db");
    await client.query("BEGIN");
    for (const user of users) {
      await client.query(
        `INSERT INTO users(name, age, address, additional_info) VALUES ($1, $2, $3, $4)`,
        [user.name, user.age, user.address, user.additional_info]
      );
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Insert failed:", err);
  } finally {
    client.release();
    console.log("db connection closed");
  }
}


export async function getAgeGroup() {
  let client;
  try {
    client = await pool.connect();
    console.log("connected to db for age group");

    const query = `SELECT CASE WHEN age < 20 THEN 'Less than 20' WHEN age BETWEEN 20 AND 40 THEN '20-40' WHEN age BETWEEN 41 AND 60 THEN '40-60' ELSE 'greater than 60' END AS age_group, COUNT(*) as count FROM users GROUP BY age_group`;
    const result = await client.query(query);

    return result;
  } catch (err) {
    console.error("Error fetching age:", err);
    throw err;
  } finally {
    client.release();
    console.log("db connection closed");
  }
}
