const express = require("express");
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
let port = 3004;
const app = express();
if (process.argv[2]) port = 3006;
let data;

console.log(`${process.env.DATABASE_USERNAME} hello`);

try {
  async function poolDemo() {
    const pool = new Pool(credentials);
    pool.query("table weather_data", (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows);
        data = res.rows;
      }
    });
    pool.end();
  }
  poolDemo();
} catch (err) {
  data = {
    message: err,
  };
  console.log(err);
}

app.get("/", async (req, res) => {
  res.status(200).json({ data });
});

app.listen(port, () => {
  console.log(`server started on ${port} `);
});
