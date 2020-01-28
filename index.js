const path = require("path");
const express = require("express");
const app = express();
/* const populateTestData = require("./util/populateTestData"); */
const config = require("./config");

const PORT = process.env.PORT || 443;

app.use(express.static(__dirname + "/public"));

app.set("view engine", "pug");

app.use(express.json());

app.get("/", (req, res) => {
  res.render(path.join(__dirname + "/public/index.pug"), { app: config.app });
});

app.post("/", (req, res) => {
  let routeObj = req.body;

  for (tech in routeObj) {
    app.get(`/${tech}`, (req, res) => {
      res.render(path.join(__dirname + "/public/route.pug"), {
        arr: routeObj[tech],
        tech
      });
    });
  }

  app.get("*", (req, res) => {
    res.render(path.join(__dirname + "/public/404.pug"), { app: config.app });
  });

  res.status(200).json({ message: "success!" });
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));

/* (async () => await populateTestData(PORT))(); */
