const path = require("path");

const DEV = process.argv[2] && process.argv[2] == "--devMode";
const DEFAULT_PORT = DEV ? 3000 : 443;
const PORT = process.env.PORT || DEFAULT_PORT;

module.exports = {
  prod: "https://roborouter.herokuapp.com",
  dev: "http://localhost:3000",
  args: {
    DEV,
    DEFAULT_PORT,
    PORT,
    ROOT: path.join(__dirname),
  },
  /* port: 3000 */
};
