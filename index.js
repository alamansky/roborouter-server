const path = require("path");
const express = require("express");
const app = express();
/* const populateTestData = require("./util/populateTestData"); */
const config = require("./config");
const dates = require("./util/dates");
const fs = require("fs");
const util = require("util");

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

const DEV = process.argv[2] && process.argv[2] == "--devMode";

const defaultPort = DEV ? 3000 : 443;

const PORT = process.env.PORT || defaultPort;

app.use(express.static(__dirname + "/public"));

app.set("view engine", "pug");

app.use(express.json());

app.get("/", (req, res) => {
  res.render(path.join(__dirname + "/public/index.pug"), {
    app: DEV ? config.dev : config.prod
  });
});

app.post("/", (req, res) => {
  let route = req.body;

  for (let [key, value] of Object.entries(route)) {
    let currentTime = Date.now();
    fs.writeFile(
      `./store/${key}.json`,
      JSON.stringify({ route: value, timestamp: currentTime }),
      err => {
        if (err) throw err;
        console.log("The file has been saved!");
      }
    );
  }

  res.status(200).json({ message: "success!" });
});

app.get("/:tech", async (req, res) => {
  let tech = req.params.tech;
  let techArr = await readdir("./store");
  let techExists = techArr.some(x => x.split(".json")[0] == tech);
  if (techExists) {
    let route = JSON.parse(await readFile(`./store/${tech}.json`, "utf-8"));
    res.render(path.join(__dirname + "/public/route.pug"), {
      app: DEV ? config.dev : config.prod,
      arr: route.route,
      tech: req.params.tech,
      timestamp: dates.relative(route.timestamp, Date.now()),
      date: dates.full()
    });
  } else {
    res.render(path.join(__dirname + "/public/404.pug"), {
      app: DEV ? config.dev : config.prod
    });
  }
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));

/* (async () => await populateTestData(PORT))(); */
