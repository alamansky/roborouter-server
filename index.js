const express = require("express");
const app = express();

const PORT = 443;

app.use(express.json());

app.post("/", (req, res) => {
  let routeObj = req.body;

  for (tech in routeObj) {
    app.get(`/${tech}`, (req, res) => {
      console.log(routeObj[tech]);
      res.json(routeObj[tech]);
    });
  }

  res.send("hello world");
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));
