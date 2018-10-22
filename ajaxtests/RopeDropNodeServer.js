var http = require('http');
var url = require('url');
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