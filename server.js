var User = require('./user');
var db = require('db');
db.connect();

var log = require('logger')(module);
function run () {
	var vasya = new User('Вася');
	var petr = new User('Петя');

	vasya.hello(petr);

	log('Успешный запуск');
}

if (module.parent) {
	exports.run = run;
} else {
	run();
}