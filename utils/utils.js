// function to create json from flat row data
export function createJSON(keys, value, obj) {
  const key = keys.shift();

  if (keys.length == 0) {
    obj[key] = value;
  } else {
    if (!obj[key]) obj[key] = {};
    createJSON(keys, value, obj[key]);
  }
  return obj;
}

// function to parse line to user object
export function parseLineToUser(line, headers) {
  const values = line.split(",");
  const rowData = {};
  headers.forEach((key, i) => (rowData[key] = values[i]));

  // console.log(rowData)

  const nestedData = {};
  for (let key in rowData) {
    if (rowData.hasOwnProperty(key)) {
      let val = rowData[key];
      createJSON(key.split("."), val, nestedData);
    }
  }

  let name =
    ((nestedData.name && nestedData.name.firstName) || "") +
    " " +
    ((nestedData.name && nestedData.name.lastName) || "");

  const additionalInfo = JSON.parse(JSON.stringify({ ...nestedData }));
  delete additionalInfo.name;
  delete additionalInfo.age;
  delete additionalInfo.address;

  const user = {
    name: name,
    age: isNaN(parseInt(nestedData.age)) ? null : parseInt(nestedData.age),
    address: nestedData.address || {},
    additional_info: additionalInfo || {},
  };

  return user;
}
