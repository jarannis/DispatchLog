var fs = require('fs');

var logfile = './RopeDropLog.txt';

exports.logThis = function (logmessage) {
	fs.appendFile(logfile, logmessage, function (err) {
		if (err) throw err;
		console.log('Log Event Written. See ' + logfile);
	});
};
