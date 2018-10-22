var http = require('http');
http.createServer(function (req, res){
	var url = req.url;
	var q = url.parse(req.url, true).query;
	var txt = q.a + " " + q.b;
	res.write(url);
	res.write("/n");
	res.write(txt);
	res.end();
}).listen(8080);