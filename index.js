const express = require("express");
const { Pool, Client } = require("pg");

const credentials = {
  user: "russell",
  host: "localhost",
  database: "greenhouseData",
  password: "Dh*&36Gs",
  port: 5432,
};

try {
  async function poolDemo() {
    const pool = new Pool(credentials);
    const now = await pool.query("SELECT NOW()");
    await pool.end();

    return now.rows[0];
  }

  async function clientDemo() {
    const client = new Client(credentials);
    await client.connect();
    const now = await client.query("SELECT NOW()");
    await client.end();

    return now.rows[0];
  }

  app.get("/", async (req, res) => {
    const pool = await poolDemo();
    const client = await clientDemo();

    res.status(200).json({
      pool: pool,
      client: client,
    });
  });
} catch (err) {
  app.get("/", (req, res) => {
    res.status(500).json({
      message: err,
    });
  });
}

const app = express();
const port = 3004;

app.listen(port, () => {
  console.log(`server started on ${port} `);
});
