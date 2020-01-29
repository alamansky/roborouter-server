const path = require("path");
const express = require("express");
const app = express();
/* const populateTestData = require("./util/populateTestData"); */
const config = require("./config");

/* const DEV = process.argv[2] != "--prodMode"; */

const PORT = process.env.PORT || 443;

app.use(express.static(__dirname + "/public"));

app.set("view engine", "pug");

app.use(express.json());

app.get("/", (req, res) => {
  res.render(path.join(__dirname + "/public/index.pug"), {
    app: config.prod
  });
});

const state = {};

app.post("/", (req, res) => {
  let route = req.body;

  for (let [key, value] of Object.entries(route)) {
    state[key.toLowerCase()] = value;
  }

  res.status(200).json({ message: "success!" });
});

app.get("/:tech", (req, res) => {
  if (state[req.params.tech.toLowerCase()]) {
    res.render(path.join(__dirname + "/public/route.pug"), {
      app: config.prod,
      arr: state[req.params.tech],
      tech: req.params.tech
    });
  } else {
    res.render(path.join(__dirname + "/public/404.pug"), {
      app: config.prod
    });
  }
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));

/* (async () => await populateTestData(PORT))(); */
