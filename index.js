const express = require("express");
const { Pool, Client } = require("pg");

const credentials = {
  user: "russell",
  host: "localhost",
  database: "greenhouseData",
  password: "Dh*&36Gs",
  port: 5432,
};
let port = 3004;
const app = express();
if(process.argv[2]) port = 3006;
let data;

try {
  async function poolDemo() {
    const pool = new Pool(credentials);
    pool.query("table weather_data", (err, res) => {
	if(err){
	   console.log(err.stack);}
	else {
	    console.log(res.rows);
 	    data = res.rows;
	}
})
    pool.end();
  }

  async function clientDemo() {
    const client = new Client(credentials);
    await client.connect();
    const now = await client.query("SELECT NOW()");
    await client.end();

    return now.rows[0];
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
