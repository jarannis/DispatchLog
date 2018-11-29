// loginroutes.js
// load crypto for salt and password hash generation
var crypto = require('crypto');

// create salt generating algorythm based on crypto
var genRandomString = function(length){
	return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
};
var sha512 = function(password, salt){
	var hash = crypto.createHmac('sha512', salt);
	hash.update(password);
	var value = hash.digest('hex');
	return{
		salt:salt,
		passwordHash:value
	};
};

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
	var userSalt = genRandomString(16);
	var passwordData = sha512(req.body.password, userSalt);

	var users={
		"name":fullname,
		"callsign":req.body.callsign,
		"deptCode":req.body.deptCode,
		"areaCode":req.body.areaCode,
		"emailAddress":req.body.emailAddress,
		"username":req.body.username,
		"salt":passwordData.salt,
		"passcode":passwordData.passwordHash
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
	var username = req.body.username;
	var password = req.body.password;
	connection.query('SELECT * FROM users WHERE username =?',[username], function(error, results, fields) {
		if(error){
			console.log("Mysql returned error: ",error);
			res.send({
				"code":400,
				"failed":"Mysql returned an error, contact your system administrator for more details"
			});
		}
		else {
			var userSalt = results[0].salt;
			var passwordData = sha512(password, userSalt);

			// console.log ("Mysql returned results for a user login query: ",results);
			if(results.length >0){
				if(results[0].passcode == passwordData.passwordHash){
					res.send({
						"code":200,
						"success":"login successfull"
					});
				}
				else{
					res.send({
						"code":204,
						"success":"Username and Password do not match"
					});
				}
			}
			else{
				res.send({
					"code":204,
					"success":"Username is not attached to a registered user"
				});
			}
		}
	});
}