// guestsearchroutes.js
// process and return guest search results

var mysql = require('mysql');
var connection = mysql.createConnection({
	host : "localhost",
	user : "ropedrop",
	password : "aJ2fZx5Idih9KzFt",
	database: "ropedrop.34"
});

connection.connect(function(err){
	if(!err) {
		console.log("Database is connected to Ropedrop Park 34.");
	}
	else {
		console.log("Unable to connect to database: " + err);
	}
});

exports.guestSearch = function(req,res){
	console.log("req",req.body);
	var searchterm = "";
	var query = "SELECT `guestID`, `firstname`,`lastname`,`zipcode`,`seasonpass` from `guests` WHERE ";
	var termsCount = 0
	if (!req.body.searchterm){
		console.log(req.body);
		if(req.body.firstname !== null){
			if (termsCount >0){
				query = query+ "OR ";
			}
			query = query+"`firstname` LIKE "+mysql.escape("%"+req.body.firstname+"%")+" ";
			termsCount++;
		}
		if(req.body.lastname){
			if (termsCount >0){
				query = query+ "OR ";
			}
			query = query+"`lastname` LIKE "+mysql.escape("%"+req.body.lastname+"%")+" ";
			termsCount++;
		}
		if(req.body.zipcode){
			if (termsCount >0){
				query = query+ "OR ";
			}
			query = query+"`zipcode` LIKE "+mysql.escape("%"+req.body.zipcode+"%")+" ";
			termsCount++;
		}
		if(req.body.seasonpass){
			if (termsCount >0){
				query = query+ "OR ";
			}
			query = query+"`seasonpass` LIKE "+mysql.escape("%"+req.body.seasonpass+"%")+" ";
			termsCount ++;
		}
		console.log(termsCount);
		query = query+"ORDER BY `firstname` ASC, `lastname` ASC";
		console.log("Query after Build from Payload: ",query);
	}
	else {
		searchterm = req.body.searchterm;
		console.log("Search Term:", searchterm);
		searchterm = mysql.escape("%"+searchterm+"%");
		query = "SELECT `guestID`, `firstname`,`lastname`,`zipcode`,`seasonpass` from `guests` WHERE `firstname` LIKE " + 
		searchterm +
			" OR `lastname` LIKE " + searchterm +
			" OR `seasonpass` LIKE " + searchterm +
			" ORDER BY `firstname` ASC, `lastname` ASC";
		console.log("Query after Build from Payload with ONLY searchterm provided: ",query);
	}
	connection.query(query, function(err, results, fields){
		if (err){
			console.log("Mysql returned error ",error);
			res.send({
				"code":400,
				"failed":"Mysql returned an error, contact your system administrator for more details"
			});
		}
		else {
			if(results.length >0){
				console.log("Guest search for req",req.body,"returned ",results.length," results");
				var jsonResponse = JSON.stringify(results);
				res.send({
					"code":200,
					"success":"Query Completed",
					"results": results,
				});
			}
			else{
				console.log("Guest search for req",req.body,"returned no results");
				res.send({
					"code":204,
					"success":"No Data Returned for that Query"
				});
			}
		}
		
	});

}