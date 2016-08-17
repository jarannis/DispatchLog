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
include_once WORKINGDIR . "/config/mysql.conf.php";

echo getcwd() . "\n";
echo WORKINGDIR . "\n";

$link = mysqli_connect(
        $_mysqlServer,
        $_mysqlUsername,
        $_mysqlPassword,
        $_mysqlDatabase);

if (!$link) {
        echo "Error: Unable to connect to MySQL. \n";
        echo "Debugging errno: " . mysqli_connect_errno() . "\n";
        echo "Debugging error: " . mysqli_connect_error() . "\n";
}
else echo "Link Established \n";
?>