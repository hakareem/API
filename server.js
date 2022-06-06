const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "api";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);

// app.use(cors());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  db.collection("");
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
