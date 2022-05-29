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

console.log(pool);

pool.on("error", (err, client) => {
  console.log(err);
});

function getAllData() {
  let data;
  pool.query("table weather_data", (err, res) => {
    if (err) {
      return err;
    } else {
      data = res.rows;
    }
  });
  return data;
}

module.exports = { getAllData };
