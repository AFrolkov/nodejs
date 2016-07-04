var User = require('./user');

function run () {
	var vasya = new User('Вася');
	var petr = new User('Петя');

	vasya.hello(petr);
}

if (module.parent) {
	exports.run = run;
} else {
	run();
}