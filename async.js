var http = require('http');
var url = require('url');
var fs = require('fs');
var debug = require('debug')('server');
var log = require('./log')(module);
var a = 5;
http.createServer(function(req, res){
	var path = url.parse(req.url).path;
	res.setHeader('Content-Type', 'text/html; charset=utf-8');

	/*if (path == '/file') {

		try {
			var info = fs.readFileSync('testTemplate.htm');
			res.end(info);
		} catch (e) {
			console.log(e);
			res.end('Файл не найден');
		}
	} else {
		res.end('не туда');
	}*/

	if (path == '/file') {
		sdf();
		fs.readFile('testTemplate.html', function(err, info){
			var a = 5;
			var b = 'artem';
			if (err) {
				res.statusCode = 500;
				res.end('Ошибка сервера!');
				return;
			}

			debugger;

			res.end(info);
		});
	} else {
		res.end('не туда');
	}
}).listen('8081', '127.0.0.1');

log.debug('a= ' + a);
log.info('сервер запущен!');
log.error('Ошибка');