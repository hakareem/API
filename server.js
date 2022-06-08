const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const MongoClient = require("mongodb").MongoClient;

//connect to db
let db,
  dbConnectionStr =
    "mongodb+srv://@api.y4nn7u2.mongodb.net/?retryWrites=true&w=majority",
  dbName = "api";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);

//middleware
app.set("view engine", "ejs"); // template
app.use(express.static("public")); //static files served up
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// api
app.get("/", (req, res) => {
  db.collection("teams")
    .find()
    .toArray()
    .then((data) => {
      res.render("index.ejs", { info: data });
    })
    .catch((err) => console.log(err));
});

app.post("/addTeam", (req, res) => {
  db.collection("teams")
    .insertOne(req.body)
    .then((result) => {
      console.log("Team Added");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

app.delete("/deleteTeam", (req, res) => {
  db.collection("teams")
    .deleteOne({ tLeague: req.body.league })
    .then((result) => {
      console.log("Team Deleted");
      res.json("Team Deleted");
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
