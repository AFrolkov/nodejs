var fs = require('fs');
var stream = fs.ReadStream('./public/3.exe');

stream.on('readable', function() {
	var data = stream.read();

	if (data) {
		console.log(data.length);
	}
	

});

stream.on('end', function() {
	console.log('stream END!');
});