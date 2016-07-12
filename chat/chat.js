var clients = [];
exports.subscribe = function (req, res) {
	clients.push(res);
}

exports.publish = function (message) {
	clients.forEach(function(clientRes) {
		clientRes.end(message);
	});

	clients = [];
}