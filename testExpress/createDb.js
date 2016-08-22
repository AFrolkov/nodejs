var MongoClient = require('mongodb').MongoClient;
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
});