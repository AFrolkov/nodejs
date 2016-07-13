var http = require('http');
var fs = require('fs');
var chat = require('./chat');
var url = require('url');

http.createServer(function(req, res) {
	var reqUrl = url.parse(req.url).pathname;
	
	if (reqUrl === '/') {
		console.log('index.html');
		sendFile('index.html', res);
	} else if (reqUrl == '/subscribe') {
		chat.subscribe(req, res);
	} else if (reqUrl == '/publish') {
		var body = '';

		req.on('data', function(data) { // либо readable но нужна проверка данных на null
			body += data;

			if (body.length > 1e4) {
				console.log(body.length);
				req.destroy();
				res.statusCode = 413;
				res.end('Слишком много данных');
			}
		});

		req.on('end', function() {
			console.log(body);
			try {
				body = JSON.parse(body);
			} catch (err) {
				console.error('%s-%s', err.message, 'невалидный json');
				res.statusCode = 400;
				res.end('Плохой запрос');
				return;
			}

			chat.publish(body.message);
			res.end();
		});
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

