var http = require('http');
var fs = require('fs');

//http.createServer(function(req, res) {
	fs.readFile('testTemplate.html', function(err, info) {
		console.log('I/O');
	});

	fs.readFile('testTemplate.html1', function(err, info) {
		console.log('I/O1');
	});



	setImmediate(function run() {
		console.log('setImmediate');
		/*for(var i = 0; i < 9999999; i++) {
		new Date();
	}*/
		setImmediate(function(){
			console.log('setImmediate2222');
		});
	});

	process.nextTick(function() {

		console.log('nextTick');
	});

	console.log('43434');
//}).listen(8888);