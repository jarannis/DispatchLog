// loginroutes.js

// load mysql connection for the RopeDrop main database
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : "localhost",
	user : "ropedrop",
	password : "aJ2fZx5Idih9KzFt",
	database : "ropedrop"
});

// test connection
connection.connect(function(err){
	if(!err){
		console.log("Database is connected ... nn");
	}
	else{
		console.log("Error connection database ... nn");
	}
})

exports.register = function(req,res){
	//console.log("req",req.body);
	var today = new Date();
	var fullname = req.body.first_name + " " + req.body.last_name;
	var users={
		"name":fullname,
		"callsign":req.body.callsign,
		"deptCode":req.body.deptCode,
		"areaCode":req.body.areaCode,
		"emailAddress":req.body.emailAddress,
		"username":req.body.username,
		"passcode":req.body.password
	}
	connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
		if(error) {
			console.log("Mysql returned an error: ",error);
			res.send({
				"code":400,
				"failed":"error returned"
			})
		}
		else{
			console.log("user added: ", results);
			res.send({
				"code":200,
				"success":"User registered successfully"
			});
		}
	});
}

exports.login = function(req,res){
	var email= req.body.email;
	var password = req.body.password;
	connection.query('SELECT * FROM users WHERE emailAddress =?',[email], function(error, results, fields) {
		if(error){
			console.log("Mysql returned error: ",error);
			res.send({
				"code":400,
				"failed":"Mysql returned an error, contact your system administrator for more details"
			});
		}
		else {
			// console.log ("Mysql returned results for a user login query: ",results);
			if(results.length >0){
				if(results[0].passcode == password){
					res.send({
						"code":200,
						"success":"login successfull"
					});
				}
				else{
					res.send({
						"code":204,
						"success":"Email and Password do not match"
					});
				}
			}
			else{
				res.send({
					"code":204,
					"success":"Email is not attached to a registered user"
				});
			}
		}
	});
}