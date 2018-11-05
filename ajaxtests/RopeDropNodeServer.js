var http = require('http');
var url = require('url');
var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Q^xv~3C"
})

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected to RopeDrop Master Database");
	con.query("SHOW DATABASES", function (err, result) {
		if (err) throw err;
		console.log("Available: " + result);
	})
});

http.createServer(function (req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	var urlData = req.url;
	var q = url.parse(req.url, true).query;
	var txt = q.a + " " + q.b;
	res.write(urlData);
	res.write("<br/>");
	res.write(txt);
	res.end();
}).listen(8080);