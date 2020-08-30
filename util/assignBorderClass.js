const differenceInBusinessDays = require("date-fns/differenceInBusinessDays");

const assignBorderClass = (date) => {
  let delta = Math.abs(differenceInBusinessDays(new Date(), new Date(date)));
  if (delta < 5) {
    return `border-left-${delta}`;
  } else {
    return `border-left-5`;
  }
};

module.exports = assignBorderClass;
