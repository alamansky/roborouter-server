const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/", (req, res) => {
  let routeObj = req.body;

  for (tech in routeObj) {
    app.get(`/${tech}`, (req, res) => {
      console.log(routeObj[tech]);
      res.status(200).json(routeObj[tech]);
    });
  }

  res.status(200).json({ message: "success!" });
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));
