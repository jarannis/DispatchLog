<?
/* installer for RopeDrop Amusement Park Management
* Copywright 2018 Christian Barnes
* Creates and installs default data into RopeDrop Master Database
* Re-Run to create additional parks
*/

// Set working directory for RopeDrop Main Folder
echo "<h1> RopeDrop installation </h1> \n\n";
define('WORKINGDIR', str_replace('/config/', '', getcwd()));
include_once WORKINGDIR . "/resource/mysql.init.php";

echo "<h3>If files extracted correctly, the current working directory should be listed as your website's root directory</h3>\n Current Working Directory: ";
echo WORKINGDIR . "\n";
if($_GET)
	$rpdrp_query = "SELECT * FROM 'Log' WHERE 'Status' == `Main RopeDrop Installation Complete`";
	$rpdrp_result = mysqli_execute($rpdrp_query);
	if($rpdrp_result->num_rows === 0) {
		echo "<h3>It does not appear as if the RopeDrop database preparation has been run yet... Would you like to run it now?</h3>\n";
		echo "<form action=\"/install.php\" method=\"get\" id=\"prepform\"><button type=\"submit\" form=\"prepform\" value=\"prepare\">Prepare Database</button></form>";

	}

?>
