var fs = require('fs');
var http = require('http');

http.createServer(function(req, res) {
	if (req.url === '/getFile') {
		var stream = fs.ReadStream('./public/2.log');

		sendFile(stream, res);
	}
}).listen(8888);

function sendFile(stream, res) {
	stream.pipe(res);

	stream.on('error', function(err) {
		res.statusCode = 500;
		res.end('Server error');
		console.error(err);
	});

	/*stream.on('open', function() {
		console.log('open');
	});

	stream.on('close', function() {
		console.log('close');
	});

	res.on('finish', function() {
		console.log('res finish');
	});*/

	res.on('close', function() {
		stream.destroy();
	});
}