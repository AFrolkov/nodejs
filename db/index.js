var phrases;
exports.connect = function () {
	phrases = require('./ru');
};

exports.getPhrase = function(name) {
	if (!phrases[name]) {
		throw new Error('такой фразы нет -->' + name);
	}

	return phrases[name];
}