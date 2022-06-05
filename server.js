const express = require("express");
const app = express();
const cors = require("cors");
const { zodiac } = require("./zodiac");
const { football } = require("./football");
const PORT = process.env.PORT || 8000;

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api", (req, res) => {
  res.json(football);
});

app.get("/api/:team", (req, res) => {
  const team = req.params.team.toLowerCase();
  if (football[team]) {
    res.json(football[team]);
  } else {
    res.json(football["unknown"]);
  }
});

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
