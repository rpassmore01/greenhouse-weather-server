const express = require("express");
const router = express.Router();
const database = require("./database.js");

router.get("/", async (req, res) => {
  try{
  let data = await database.getAllData();
  console.log(data);
  res.status(200).json({ data });
  }
  catch(err){
  res.status(500).json({error: err.stack});
  }
});

router.post("/", (req, res) => {
  if(req.body.temperature && req.body.humidity){
    try{
      if(req.headers.authkey == process.env.AUTH_KEY){
      database.addWeatherData(req.body.temperature, req.body.humidity);
      res.status(200);
      }else{
      res.status(401).json({message: "No valid authorization key was added"});
      }
    }catch(err){
      res.status(500).json({error: err});
    }
  }else {
    res.status(400).json({message: "Request does not have data for temperature and humidity"});
  }
});

module.exports = router;
