var Users = require('../models/user').User;
var HttpError = require('../error').HttpError;
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app) {
	app.get('/', function(req, res, next) {
		res.render('index', {title: 'хуй!'});
	});

	app.get('/users', function(req, res, next) {
		Users.find({}, function(err, users) {
			if (err) return next(err);

			res.json(users);
		});
	});

	app.get('/user/:id', function(req, res, next) {
		try {
			var id = new ObjectID(req.params.id);
		} catch (e) {
			next(404);
			return;
		}

		Users.findById(id, function(err, user) {
			if (err) return next(err);
			if(!user) return next(new HttpError(404));
			res.json(user);
		});
	});
}