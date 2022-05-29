const express = require("express");
const router = express.Router();
const database = require("./database.js");

router.get("/", (req, res) => {
  const data = database.getAllData();
  res.status(200).json({ data });
});

module.exports = router;
