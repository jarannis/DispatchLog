var http = require('http');
http.createserver(function (req, res){
	var url = req.url;
	res.write(url);
})