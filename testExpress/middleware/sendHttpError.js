module.exports = function(req, res, next) {
	console.log('res.sendHttpError');
	res.sendHttpError = function(error) {
		res.status(error.status);

		if (req.xhr) {
			res.json(error);
		} else {
			res.render('error', {error: error});
		}
	};

	next();
};