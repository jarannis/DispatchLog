var mysql = require('mysql');
var qresult = null;
module.exports = {
		versionQuery : function(type, conn, callback) {
			var query = "SELECT `logtext` FROM `masterlog` WHERE `logtype` LIKE " + mysql.escape(type) + " ORDER BY `logstamp` DESC LIMIT 1";
			//console.log(query);
			//conn.connect();
			conn.query(query, function (err, rows, fields) {
				if (err) throw err;
				return callback(rows[0].logtext);
			});
		},
		parksQuery : function(conn, callback) {
			var query = "SELECT * FROM `parks` ORDER BY `ParkCode` ASC";
			conn.query(query, function (err, rows, fields) {
				if (err) throw err;
				return callback(rows);
			})
		},
		guestSearchLive : function(conn, search, callback){
			console.log("loaded GuestSearch");
			search = search + "%";
			search = mysql.escape(search);
			var query = "SELECT `firstname`,`lastname`,`zipcode`,`seasonpass` FROM `guests` WHERE `firstname` LIKE " + 
			search + 
			" OR `lastname` LIKE " + search + 
			" OR `seasonpass` LIKE " + search +
			" ORDER BY `firstname` ASC, `lastname` ASC";
			conn.query(query, function(err, rows, fields){
				if (err) throw err;
				return callback(rows);
			});
		},
		interactionSearch : function(conn, search, by, callback){
			search = mysql.escape(search);
			console.log("Passed Data: Search By (" + by +") terms (" + search + ")");
			query = "SELECT interactions.`interactID`, interactions.`satisfied`, interactions.`followup`, "
			+ "CONCAT(guests.firstname,' ',guests.lastname) AS guestname FROM interactions JOIN `guests` ON interactions.guestID=guests.guestID WHERE ";
			console.log()
			switch (by){
				case "G":
					query = query + "`interactions`.`guestID` = " + search;
				break;

				case "A":
					console.log("Insert Department ID Query into queries.js line 45");
				break;

				case "D":

				break;

				case "F":
					query = query + "`followup` != \"No\"" + search;
				break;
			}
			console.log("final query: " + query);
			conn.query(query,function(err,rows,fields){
				if(err) throw err;
				return callback(rows);
			});
		},
		passwordReset : function(conn, username, newpass, callback){
			username = mysql.escape(username);
			password = mysql.escape(password);

		}
}
