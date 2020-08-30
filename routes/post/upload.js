const routeModel = require("../../models/route");

const upload = async (req, res) => {
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
        message: `modified ${updatedRoute.nModified} doc(s) for ${key}`,
      });
    } else {
      let routeObj = { tech: key, route: value, timestamp: currentTime };
      let newRoute = routeModel(routeObj);
      newRoute.save().then((route) => {
        console.log(`saved route for ${key}`);
      });
      res.status(200).json({
        message: `all good`,
      });
    }
  }
};

module.exports = upload;
