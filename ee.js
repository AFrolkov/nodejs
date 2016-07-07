var EventEmitter = require('events').EventEmitter;

var server = new EventEmitter();

server.on('req', function(req) {
	req.emitted = true;
});

server.on('req', function(req){
	console.log(req);
});

server.emit('req', {name: 'Artem'});
server.emit('req', {age: 26});

console.log(server.listeners('req').length);