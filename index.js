const path = require("path");
const express = require("express");
const app = express();
/* const populateTestData = require("./util/populateTestData"); */
const config = require("./config");
var db = require("text-db")("./db");
const dates = require("./util/dates");

const DEV = process.argv[2] && process.argv[2] == "--devMode";

const defaultPort = DEV ? 3000 : 443;

const PORT = process.env.PORT || defaultPort;

app.use(express.static(__dirname + "/public"));

app.set("view engine", "pug");

app.use(express.json());

app.get("/", (req, res) => {
  res.render(path.join(__dirname + "/public/index.pug"), {
    app: DEV ? config.dev : config.prod,
    techs: db.getKeys()
  });
});

app.post("/", (req, res) => {
  let route = req.body;

  for (let [key, value] of Object.entries(route)) {
    db.setItem(key, { route: value, timestamp: Date.now() });
    db.setItem("lastExport", Date.now());
  }

  res.status(200).json({ message: "success!" });
});

app.get("/:tech", (req, res) => {
  let techExists = db.getKeys().some(key => key == req.params.tech);
  if (techExists) {
    res.render(path.join(__dirname + "/public/route.pug"), {
      app: DEV ? config.dev : config.prod,
      arr: db.getItem(req.params.tech).route,
      tech: req.params.tech,
      timestamp: dates.relative(
        db.getItem(req.params.tech).timestamp,
        Date.now()
      ),
      date: dates.full()
    });
  } else {
    res.render(path.join(__dirname + "/public/404.pug"), {
      app: DEV ? config.dev : config.prod,
      lastExport: dates.relative(db.getItem("lastExport"), Date.now())
    });
  }
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));

/* (async () => await populateTestData(PORT))(); */
