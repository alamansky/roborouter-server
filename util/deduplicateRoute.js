/** @format */

const deduplicateRoute = (route) => {
	const uniqueAddresses = [];
	let deduplicatedRoute = route.map((street) => {
		return street.reduce((acc, val) => {
			let address = JSON.stringify(val[0]);
			!uniqueAddresses.includes(address) && acc.push(val);
			uniqueAddresses.push(address);
			return acc;
		}, []);
	});
	return deduplicatedRoute;
};

module.exports = deduplicateRoute;
