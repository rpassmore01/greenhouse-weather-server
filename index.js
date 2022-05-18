const express = require("express");

const app = express();
const port = 3004;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Successfully requested the root url.",
  });
});

app.listen(port, () => {
  console.log(`server started on ${port} `);
});
