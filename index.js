require("dotenv").config();

const path = require("path");
const express = require("express");
const config = require("./config");
const dates = require("./util/dates");

const app = express();

const db = require("./database");
const routeModel = require("./models/route");

const DEV = process.argv[2] && process.argv[2] == "--devMode";

const DEFAULT_PORT = DEV ? 3000 : 443;

const PORT = process.env.PORT || DEFAULT_PORT;

app.use(express.static(__dirname + "/public"));

app.set("view engine", "pug");

app.use(express.json());

app.get("/", (req, res) => {
  res.render(path.join(__dirname + "/public/index.pug"), {
    app: DEV ? config.dev : config.prod
  });
});

app.post("/", async (req, res) => {
  let route = req.body;

  for (let [key, value] of Object.entries(route)) {
    let currentTime = Date.now();
    let routeExists = await routeModel.exists({ tech: key });

    if (routeExists) {
      const updatedRoute = await routeModel.updateOne(
        { tech: key },
        { route: value, timestamp: currentTime },
        { new: true }
      );

      res.status(200).json({
        message: `modified ${updatedRoute.nModified} doc(s) for ${key}`
      });
    } else {
      let routeObj = { tech: key, route: value, timestamp: currentTime };
      let newRoute = routeModel(routeObj);
      newRoute.save().then(route => {
        console.log(`saved route for ${key}`);
      });
      res.status(200).json({
        message: `all good`
      });
    }
  }
});

app.get("/:tech", async (req, res) => {
  let tech = req.params.tech;
  let routeExists = await routeModel.exists({ tech });
  if (routeExists) {
    let route = await routeModel.findOne({ tech });
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

/* (async () => await populateTestData(PORT))();
 */
