<?php

/* 
 * Copyright (C) 2016 galax
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

define('WORKINGDIR', str_replace('/config', '', getcwd())); 
// include_once WORKINGDIR . "/config/mysql.conf.php"; //Excluded for DB Structure Changes.

$_rpdrpMysqlServer = "127.0.0.1";
$_rpdrpMysqlUsername = "root";
$_rpdrpMysqlPassword = "Q^xv~3C";
$_rpdrpMainDB = "ropedrop_main";


echo getcwd() . "\n";
echo WORKINGDIR . "\n";

$mainDB = new mysqli($_rpdrpMysqlServer, $_rpdrpMysqlUsername, $_rpdrpMysqlPassword, $_rpdrpMainDB);
if ($mainDB->connect_errno) {
	// Connection Failed
	echo "The Database set up in the configuration file failed to connect: \n";
	echo "Errno: " . $mainDB->connect_errno . "\n";
	echo "Errno: " . $mainDB->connect_error . "\n";

	// terminate script here.
	exit;
}
else echo "Database Link Established \n";

?>