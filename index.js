const express = require("express");
const { Pool, Client } = require("pg");

const credentials = {
  user: "russell",
  host: "localhost",
  database: "greenhouseData",
  password: "Dh*&36Gs",
  port: 5432,
};

const app = express();
const port = 3004;
let data;

try {
  async function poolDemo() {
    const pool = new Pool(credentials);
    const now = await pool.query("SELECT NOW()");
    await pool.end();

    data = now.rows[0];
  }

  async function clientDemo() {
    const client = new Client(credentials);
    await client.connect();
    const now = await client.query("SELECT NOW()");
    await client.end();

    return now.rows[0];
  }
} catch (err) {
  data = {
    message: err,
  };
}

app.get("/", async (req, res) => {
  res.status(200).json({ data });
});

app.listen(port, () => {
  console.log(`server started on ${port} `);
});
