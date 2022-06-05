const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(require("./routes"));

let port = process.env.PORT;

if (process.argv[2]) port = 3006;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
