var Event = require('events').EventEmitter;
var db = new Event();
function Req () {
	var self = this;
	this.bigData = new Array(1e6).join('*');

	this.info = function (info) {
		console.log(info);
	};

	db.on('data', function (info) {
		self.info(info);
	});
}

setInterval(function() {
	var one = new Req();
	console.log(process.memoryUsage().heapUsed);
	//console.log(db);
}, 10);