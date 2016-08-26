/*var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1/test', function(err, db) {
	if (err) throw err;

	var collection = db.collection('test_insert');

	collection.remove({}, function(err) {
		if (err) throw err;
		
		collection.insert({name: 'Artem Frolkov'}, function(err, docs) {
			collection.count(function(err, count) {
				console.log(format('count = %s', count));
			});

			var cursor = collection.find({name: 'Artem'});
			cursor.toArray(function(err, results) {
				console.dir(results);
				db.close();
			});
		});

	});
});*/

/*var User = require('./models/user').User;

var user = new User({
	username: 'Frolkov',
	password: 'secret'
})

user.save(function(err, user, affected) {
	if (err) {
		throw err;
	}

	console.log('done');
});

User.findOne({username: 'Frolkov'}, function(err, data) {
	console.log(data);
});*/

//connect
//drop
//new users -> save
//close

var mongoose = require('./libs/mongoose');
var async = require('async');
mongoose.set('debug', true);

mongoose.connection.on('open', function() {
	mongoose.connection.db.dropDatabase(function(err) {
		if (err) throw err;
		console.log('droped');

		require('./models/user');

		async.parallel([
			function(callback) {
				var artem = new mongoose.models.User({username: "Artem", password: "123"});
				artem.save(function(err) {
					callback(err, artem);
				});
			}
			], function(err, results) {
			console.log(arguments)
		});

	});
});
