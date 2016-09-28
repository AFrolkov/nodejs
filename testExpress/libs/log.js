var winston = require('winston');

function getLogger(module, app) {
	var env = app.get('env');
	var path = module.filename.split('\\').slice(-2).join('\\');

	return new winston.Logger({
		transports: [
			new winston.transports.Console({
				colorize: true,
				level: env == 'development' ? 'debug' : 'error' ,
				label: path
			})
		]
	});
}

module.exports = getLogger;