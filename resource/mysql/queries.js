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
		}
}
