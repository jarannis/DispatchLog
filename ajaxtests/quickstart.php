<?php

/* 
 * Copyright (C) 2016 cbarnes
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

// we'll generate XML output
header('Content-Type: text/xml');
// generate XML header
echo '<?xml version="1.0" encoding="UTF8" standalone="yes"?>';
// create the <response> element
echo '<response>';

// retrieve the user name
$name = $_GET['name'];


// generate the output depending on the user name received from client
$userNames = array('CHRISTIAN', 'BOGDAN', 'FILIP', 'MIHAI', 'YODA');
if (in_array(strtoupper($name), $userNames))
{
        echo 'Hello, master ' . htmlentities($name) . '!';
}
else{
    echo htmlentities($name) . ', I don\'t know you!';
}
// close the <response> element
echo '</response>';
?>
