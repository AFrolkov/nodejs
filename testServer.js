var http = require('http');
var url = require('url');

var server = new http.Server();

server.listen(8888, '127.0.0.1');

server.on('request', function(req, res){
	var parseUrl = url.parse(req.url, true);
	console.log(req.method);
	console.log(parseUrl);

	if (parseUrl.pathname == '/echo' && parseUrl.query.message) {
		res.setHeader('Cache-control', 'no-cache');
		res.end(parseUrl.query.message);
	} else {
		res.statusCode = 404;
		res.end('page not found');
	}
});

console.log('Сервер запущен');