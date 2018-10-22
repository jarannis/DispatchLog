var http = require('http');
http.createServer(function (req, res){
	var url = req.url;
	res.write(url);
	res.end();
}).listen(8080);