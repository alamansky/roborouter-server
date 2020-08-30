/** @format */

const dates = require('./dates');

const sortByDispatchDate = (route) => {
	let sortedRoute = [];
	let obj = {};
	route.forEach((street) => {
		let firstAccount = street[0];
		let dispatchDate = firstAccount[1][3].split(' ')[0];
		obj[dispatchDate] ? obj[dispatchDate].push(street) : (obj[dispatchDate] = new Array(street));
	});
	const sortedDates = dates.sortFullDates(Object.keys(obj));
	sortedDates.forEach((date) => {
		sortedRoute = sortedRoute.concat(obj[date]);
	});
	return sortedRoute;
};

module.exports = sortByDispatchDate;
