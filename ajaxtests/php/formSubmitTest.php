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

// load Error Handling module
require_once('error_handler.php');
// specify XML output
header("Content-type: text/xml");
// calculate result
$firstNumber = $_GET['firstNumber'];
$secondNumber = $_GET['secondNumber'];
$result = $firstNumber / $secondNumber;
// create new XML Doc
$dom = new DOMDocument();
// create root <response> element and add it to the document
$response = $dom->createElement('response');
$dom->appendChild($response);
// append the calculation value as text node of <response>
$responseText = $dom->createTextNode($result);
$response->appendChild($responseText);
// build the XML Structure in a string var.
$xmlString = $dom->saveXML();
// output the string
echo $xmlString;

?>
