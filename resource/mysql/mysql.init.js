var mysql = require('mysql');

var con = mysql.createConnection({
	host: 'localhost',
	user: 'ropedrop',
	password: 'aJ2fZx5Idih9KzFt',
	database: 'ropedrop'
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected to Mysql database: " . options.host);
})
