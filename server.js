const express = require("express");
const app = express();
const cors = require("cors");
const { zodiac } = require("./zodiac");
const PORT = process.env.PORT || 8000;

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api", (req, res) => {
  res.json(zodiac);
});

app.get("/api/:month", (req, res) => {
  const month = req.params.month.toLowerCase();
  if (zodiac[month]) {
    res.json(zodiac[month]);
  } else {
    res.json(zodiac["unknown"]);
  }
});

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
