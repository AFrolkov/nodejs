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

function open(callback) {
	mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
	mongoose.connection.db.dropDatabase(callback);
}

function requireModels(callback) {
	//чтобы создание индекса (username unique)
	//происходило после dropDatabase
	require('./models/user');

	async.each(Object.keys(mongoose.models), function(modelName, callback) {
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback);
}

function createUsers(callback) {
	var users = [
		{username: 'art1', password: 'pass'},
		{username: 'art1', password: 'pass'},
		{username: 'art3', password: 'pass'}
	];

	async.each(users, function(user, callback) {
		var newUser = mongoose.models.User(user);
		newUser.save(callback);
	}, callback);

}

function close(callback) {
	mongoose.disconnect(callback);
}

async.series([
	open,
	dropDatabase,
	requireModels,
	createUsers,
	close
], function(err, res) {
	mongoose.disconnect();
	console.log(arguments);
});
