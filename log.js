var winston = require('winston');

module.exports = function(module) {
	return makeLogger(module.filename);
}

function makeLogger(filename) {
	if (filename.match(/async.js/)) {
		var transports = [
			new winston.transports.Console({
				timestamp: true,
				colorize: true,
				level: 'debug'
			}),
			new winston.transports.File({
				filename: 'debug.log',
				level: 'debug'
			})
		];

		return new winston.Logger({transports: transports});
	} else {
		return new winston.Logger({transports: []});
	}
}