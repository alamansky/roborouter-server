/** @format */

const routeModel = require('../../models/route');
const sortByDispatchDate = require('../../util/sortByDispatchDate');
const assignBorderClass = require('../../util/assignBorderClass');
const deleteEmptyChildArrays = require('../../util/deleteEmptyChildArrays');
const config = require('../../config');
const dates = require('../../util/dates');
const path = require('path');

const tech = async (req, res) => {
	const tech = req.params.tech;
	const routeExists = await routeModel.exists({ tech });
	if (routeExists) {
		const { route, timestamp } = await routeModel.findOne({ tech });
		const prodRoute = route[0] ? deleteEmptyChildArrays(route[0]) : null;
		const ccRoute = route[1].length > 0 ? route[1] : null;
		console.log('cc route:');
		console.log(ccRoute);
		console.log('prod route:');
		console.log(prodRoute);
		const locals = {
			app: config.args.DEV ? config.dev : config.prod,
			arr: prodRoute,
			cc: ccRoute,
			tech,
			timestamp: dates.relative(timestamp, Date.now()),
			date: dates.full(),
			funcs: {
				assignBorderClass,
			},
		};
		res.render(path.join(config.args.ROOT + '/public/route.pug'), locals);
	} else {
		res.render(path.join(config.args.ROOT + '/public/404.pug'), {
			app: config.args.DEV ? config.dev : config.prod,
		});
	}
};

module.exports = tech;
