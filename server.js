var user = require('./user');

var vasya = new user.User('Вася');
var petr = new user.User('Петя');

vasya.hello(petr);
