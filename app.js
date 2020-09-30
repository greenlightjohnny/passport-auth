const express = require("express");
const main = require("./routes/index");
const app = express();

const PORT = process.env.port || 5000;

app.get("/", main);

app.listen(PORT, console.log(`running on port ${PORT}`));
