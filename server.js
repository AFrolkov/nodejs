var User = require('./user');
var db = require('db');
var util = require('util');
db.connect();

var log = require('logger')(module);
function run () {
	var vasya = new User('Вася');
	var petr = new User('Петя');
	var obj = {name: 'artem', age: 26};
	obj.inspect = function () {
		return 123;
	};

	vasya.hello(petr);

	log('Успешный запуск');

	console.log(util.inspect(obj));
}

if (module.parent) {
	exports.run = run;
} else {
	run();
}