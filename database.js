const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const credentials = {
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
};

const pool = new Pool(credentials);

pool.on("error", (err, client) => {
  console.log(err);
});

async function getAllData() {
  const { rows } = await pool.query("table weather_data");
  return rows;
}

async function addWeatherData(temperature, humidity){
  try{
  const res = await pool.query(`INSERT INTO weather_data (temperature, humidity, created_on) VALUES (${temperature}, ${humidity}, CURRENT_TIMESTAMP)`);
  console.log(`Inserted data`);
  return new Promise((resolve, reject) => {
    resolve({success: true});
  });
  }catch(err){
    return new Promise((resolve, reject) => {
      reject({success: false});
    });
  }
}

module.exports = { getAllData, addWeatherData};
