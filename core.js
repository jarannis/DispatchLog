/* Homepage Generator for RopeDrop V 0.0.1
Created by Christian Barnes

Homepage loads Session Management first, checks for a valid session, checks session against unique "Last Session" code from DB.
Sessions expire after 24 hours, and a new session code must be generated.

*/
// we start by loading mysql for any other resources that may need it
var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "ropedrop",
	password: "aJ2fZx5Idih9KzFt",
	database: "ropedrop"
});
con.connect(function(err) {
	if (err) console.log(err);
	console.log("Connected to RopeDrop Main Database");
});

// Build array to store park information for quicker reading later.
//var parks[];

console.log("Preparing Socket for connection to React-UI");

// the following contains all the database queries in handy function formats
var queries = require('./resource/mysql/queries.js');
var mainversion = queries.versionQuery("mainversion", con, function(result){
	console.log(result);
});
var dbversion = queries.versionQuery("databaseversion", con, function(result){
	console.log(result);
});
console.log("Available Parks:");
var parksquery = queries.parksQuery(con, function(result){
	result.forEach(function(row) {
		console.log(
			row.ParkName + 
			" Park Code: " + 
			row.ParkCode  + 
			" Park Database Name: " + 
			row.DatabaseName);
	}
)});
var parkCon = mysql.createConnection({
	host: "localhost",
	user: "ropedrop",
	password: "aJ2fZx5Idih9KzFt",
	database: "ropedrop.34"
});
con.connect(function(err) {
	if (err) console.log(err);
	console.log("connected to Park Database 34");
});

var guestsearch = queries.guestSearchLive(parkCon, "3401", function(result){
	result.forEach(function(row) {
		console.log(
			row.firstname +
			" " +
			row.lastname +
			" " +
			row.zipcode +
			" " +
			row.seasonpass);
	}
)});

// async guest search function 

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function promptInput (prompt, handler)
{
    rl.question(prompt, input =>
    {
        if (handler(input) !== false)
        {
            promptInput(prompt, handler);
        }
        else
        {
            rl.close();
        }
    });
}

promptInput('query> ', input =>
{
	console.log(input);
	var action = input.slice(0,1);
	var data = input.slice(2);
	console.log("Split Action: " + action);
	console.log("Split Data:" + data);
    switch (action) {
    	case "P":
    		console.log(input.startsWith("P"));
    		break;
    		console.log("Still Running");
        case "G":
        	console.log("Query accepted: " + data);
            var guestCmdSearch = queries.guestSearchLive(parkCon, data, function(result){
            	result.forEach(function(row){
            		console.log(
            			row.firstname +
            			" " +
            			row.lastname +
            			" " +
            			row.zipcode +
            			" " +
            			row.seasonpass);
            	}
            )});
            input == null;
            break;
        case 'exit':
            console.log('Bye!');
            return false;
    }
});
// end async guest search
// var dbversion = queries.versionQuery("databaseversion", con);

// console.log("Version Check: ". mainversion);


// this one's to load the login logic.
//require('./resource/login/loginlogic.js');

// and this one stores sessions logged in to.
//require('./resource/session/sessionmanagement.js');

// and finally, this one establishes a socket to connect between this Node app and the React user interface.
//require('./resource/socket/reactSocket.js');



