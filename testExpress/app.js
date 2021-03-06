
/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var config = require('./config');
var app = express();
var log = require('./libs/log')(module, app);
var HttpError = require('./error').HttpError;

app.set('port', config.get('port'));

// all environments
app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./middleware/sendHttpError'));

require('./routes')(app);





// development only
/*if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}*/
/*
app.get('/', routes.index);
app.get('/users', user.list);*/

app.use(function(err, req, res, next) {
	if (typeof err === 'number') {
		err = new HttpError(err);
	}

	if (err instanceof HttpError) {
		res.sendHttpError(err);
	} else {
		if (app.get('env') === 'development') {
			express.errorHandler()(err, req, res, next);
		} else {
			log.error(err);
			err = new HttpError(500);
			res.sendHttpError(err);
		}
	}
});


http.createServer(app).listen(config.get('port'), function(){
	log.info('Express server listening on port ' + config.get('port'));
});
