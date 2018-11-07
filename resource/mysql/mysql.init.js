var mysql = require('mysql');
var options = {
	host: "localhost",
	user: "ropedrop",
	password: "aJ2fZx5Idih9KzFt",
	database: "ropedrop"
};

var con = mysql.createConnection(options);

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected to Mysql database: " . options.host);
})
