
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var config = require('./config');
var app = express();
app.set('port', config.get('port'));
//кривота конечно, чтобы передать переменную окружения
module.exports = app;
var log = require('./libs/log')(module);


// all environments

/*app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));*/

// development only
/*if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}*/
/*
app.get('/', routes.index);
app.get('/users', user.list);*/

app.use(function(req, res, next) {
	if (req.url == '/') {
		res.send('HELLO');
	} else {
		next();
	}
});

app.use(function(req, res, next) {
	if (req.url == '/re') {
		next(new Error('zzz'));
	} else {
		next();
	}
});

app.use(function(err, req, res, next) {
	var err1 = express.errorHandler({showStack: true});
	err1(err, req, res, next);
});



http.createServer(app).listen(config.get('port'), function(){
	log.info('Express server listening on port ' + config.get('port'));
});

module.exports = app;
