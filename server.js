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
    .sort({ likes: -1 })
    .toArray()
    .then((data) => {
      res.render("index.ejs", { info: data });
    })
    .catch((error) => console.error(error));
});

app.post("/addTeam", (req, res) => {
  db.collection("teams")
    .insertOne({
      teamName: req.body.teamName,
      leagueName: req.body.leagueName,
      likes: 0,
    })
    .then((result) => {
      console.log("Team Added");
      res.redirect("/");
    })
    .catch((error) => console.error(error));
});

app.put("/addOneLike", (req, res) => {
  db.collection("teams")
    .updateOne(
      {
        teamName: req.body.teamName,
        leagueName: req.body.leagueName,
        likes: req.body.likes,
      },
      {
        $set: {
          likes: req.body.likes + 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      }
    )
    .then((result) => {
      console.log("Added One Like");
      res.json("Like Added");
    })
    .catch((error) => console.error(error));
});

app.delete("/deleteTeam", (req, res) => {
  db.collection("teams")
    .deleteOne({ teamName: req.body.teamName })
    .then((result) => {
      console.log("Team Deleted");
      res.json("Team Deleted");
    })
    .catch((error) => console.error(error));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
