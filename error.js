var util = require('util');

var obj = {Hello: 'Привет', World: 'Мир'};

function PhraseError (message) {
	this.message = message;
	Error.captureStackTrace(this, PhraseError);
}

util.inherits(PhraseError, Error);
PhraseError.prototype.name = 'PhraseError';

function HttpError (status, message) {
	this.status = status;
	this.message = message;
}

util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';

function getPhrase(name) {
	if (!obj[name]) {
		throw new PhraseError('Нет такой фразы ' + name);
	}

	return obj[name];
}

function makePage(url) {
	if (url !== 'index.html') {
		throw new HttpError(404, 'Нет такой страницы ' + url);
	}

	return util.format("%s, %s", getPhrase('Hell'), getPhrase('World'));
}

try {
	var page = makePage('index.html');
	console.log(page);
} catch (e) {
	if (e instanceof HttpError) {
		console.log(e.status, e.message);
	} else {
		console.error("Ошибка %s\n сообщение: %s\n стек: %s", e.name, e.message, e.stack);
	}
}
