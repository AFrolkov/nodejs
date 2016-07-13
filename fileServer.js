var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

var ROOT = __dirname + '\\public';

http.createServer(function(req, res) {
	if (!checkAccess(req)) {
		res.statusCode = 403;
		res.end('Secret?!');
		return;
	}

	sendFileSafe(url.parse(req.url).pathname, res);
}).listen(8888);

function checkAccess(req) {
	return url.parse(req.url, true).query.secret == '9550';
}

function sendFileSafe(filePath, res) {
	try {
		filePath = decodeURIComponent(filePath);
	} catch (err) {
		res.statusCode = 400;
		res.end('Bad request, decodeURI err');
		return;
	}

	if (~filePath.indexOf('\0')) {
		res.statusCode = 400;
		res.end('Bad request');
		return;
	}

	filePath = path.normalize(path.join(ROOT, filePath));

	if (filePath.indexOf(ROOT) != 0) {
		console.log(filePath);
		console.log(ROOT);
		res.statusCode = 404;
		res.end('file not found1');
		return;
	}

	fs.stat(filePath, function(err, data) {
		if (err || !data.isFile()) {
			res.statusCode = 404;
			res.end('file not found2');
			return;
		}

		sendFile(filePath, res);
	});
}

function sendFile (filePath, res) {
	//не совсем правильно, нужен поток
	fs.readFile(filePath, function(err, data) {
		if (err) {
			res.statusCode = 500;
			res.end('problem with server file system');
			return;
		}

		var mime = require('mime').lookup(filePath);

		res.setHeader('Content-Type', mime + '; charset=utf-8');
		res.end(data);
	});
}