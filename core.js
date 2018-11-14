/* Homepage Generator for RopeDrop V 0.0.1
Created by Christian Barnes

Homepage loads Session Management first, checks for a valid session, checks session against unique "Last Session" code from DB.
Sessions expire after 24 hours, and a new session code must be generated.

*/
// we start by loading mysql for any other resources that may need it
var mysql = require('mysql');
// connect to main RopeDrop database
var con = mysql.createConnection({
	host: "localhost",
	user: "ropedrop",
	password: "aJ2fZx5Idih9KzFt",
	database: "ropedrop"
});
// check connection to main RopeDrop database
con.connect(function(err) {
	if (err) console.log(err);
	console.log("Connected to RopeDrop Main Database");
});

// Build array to store park information for quicker reading later.

// Session Start Section
console.log("Preparing Socket for connection to React-UI");

// the following contains all the database queries in handy function formats
var queries = require('./resource/mysql/queries.js');
// get version information from database and echo to console
var mainversion = queries.versionQuery("mainversion", con, function(result){
	console.log(result);
});
var dbversion = queries.versionQuery("databaseversion", con, function(result){
	console.log(result);
});

// select all parks and display data about each active park
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

// Hardcoded connect to park 34, Elitch Gardens
var parkCon = mysql.createConnection({
	host: "localhost",
	user: "ropedrop",
	password: "aJ2fZx5Idih9KzFt",
	database: "ropedrop.34"
});
// Check Park 34 database connection
con.connect(function(err) {
	if (err) console.log(err);
	console.log("connected to Park Database 34");
});
/* This search is a hard-coded search through the "guests" database for a specific query.
** Use this example for parsing future queries
** var guestsearch = queries.guestSearchLive(parkCon, "3401", function(result){
** 	result.forEach(function(row) {
**		console.log(
**			row.firstname +
**			" " +
**			row.lastname +
**			" " +
**			row.zipcode +
**			" " +
**			row.seasonpass);
**	}
** )});
*/

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
	// console.log("Split Action: " + action);
	// console.log("Split Data:" + data);
    switch (action) {
    	case "P":
    		// console.log(input.startsWith("P"));
    		break;
    		// console.log("Still Running");
        case "G":
        	// console.log("Query accepted: " + data);
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
        case "I":
        	var searchby = data.slice (0,1);
        	data = data.slice (1);
        	var interactSearch = queries.interactionSearch(parkCon, data, searchby, function(result){
        		result.forEach(function(row){
        			console.log(
        				row.interactID +
        				" " +
        				row.satisfied +
        				" " +
        				row.followup +
        				" " +
        				row.guestname);
        		})
        	})
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



