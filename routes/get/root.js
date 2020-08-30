const path = require("path");
const config = require("../../config");

const root = (req, res) => {
  res.render(path.join(config.args.ROOT + "/public/index.pug"), {
    app: config.args.DEV ? config.dev : config.prod,
  });
};

module.exports = root;
