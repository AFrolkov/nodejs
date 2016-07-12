var http = require('http');
var fs = require('fs');
var chat = require('./chat');

http.createServer(function(req, res) {
	if (req.url === '/') {
		sendFile('index.html', res);
	} else if (req.url == '/subscribe') {
		chat.subscribe(req, res);
	} else if (req.url == '/publish') {
		console.log('publish!');
		chat.publish('123');
	}
}).listen(8888);

function sendFile(fileName, res) {
	var stream = fs.createReadStream(fileName);
	
	stream.pipe(res);

	stream.on('error', function(err) {
		res.statusCode = 500;
		res.end('Server error');
		console.error(err);
	});

	res.on('close', function() {
		stream.destroy();
	});
}