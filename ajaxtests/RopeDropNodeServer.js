var http = require('http');
var url = require('url');
http.createServer(function (req, res){
	var urlData = req.url;
	var q = url.parse(req.url, true).query;
	var txt = q.a + " " + q.b;
	res.write(urlData);
	res.write("/n");
	res.write(txt);
	res.end();
}).listen(8080);