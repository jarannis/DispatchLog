/* Homepage Generator for RopeDrop V 0.0.1
Created by Christian Barnes

Homepage loads Session Management first, checks for a valid session, checks session against unique "Last Session" code from DB.
Sessions expire after 24 hours, and a new session code must be generated.

*/
require('./resource/mysql/mysql.init.js');
