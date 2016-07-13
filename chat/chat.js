var clients = [];
exports.subscribe = function (req, res) {
	clients.push(res);

	/*res.on('close', function() {
		console.log('close');
		clients.splice(clients.indexOf(res), 1);
	});*/
}

exports.publish = function (message) {
	clients.forEach(function(clientRes) {
		clientRes.end(message);
	});

	clients = [];
}

/*setInterval(function() {
	console.log(clients.length);
}, 1000);*/