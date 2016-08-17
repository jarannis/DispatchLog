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
include_once WORKINGDIR . "/resource/mysql.init.php";

{

echo "Building Downtimes Table \n";
$createQuery = "CREATE TABLE downtimes ("
    ."dtID INT UNSIGNED NOT NULL AUTO_INCREMENT,"
    ."timeSig2A DATETIME"
    ."timeSig2 DATETIME,"
    ."timeSig25 DATETIME,"
    ."timeSig4 DATETIME,"
    ."maintOnsite DATETIME,"
    ."opsOnsite DATETIME,"
    ."maintCleared varchar(32),"
    ."opsCleared varchar(32),"
    ."locationType int,"
    ."locationID int,"
    ."vehicleLocations varchar(100),"
    ."reportingParty VARCHAR(32),"
    ."downtimeType VARCHAR(12),"
    ."notes VARCHAR(640),"
    . "PRIMARY KEY (dtID))";

echo "Submitting Downtimes Table to Database \n";

mysqli_query($link, $createQuery);

echo "Building First Aid Log Table \n";

$createQuery = "CREATE TABLE firstAidLog ("
        . "firstAidID INT NOT NULL AUTO_INCREMENT,"
        . "symptomType varchar(24),"
        . "reportingParty varchar(32),"
        . "receivedTime DATETIME,"
        . "locationType INT,"
        . "location INT,"
        . "locationNotes VARCHAR(240),"
        . "dispatchedTime DATETIME,"
        . "respondingUnit VARCHAR(32),"
        . "unitOnSiteTime DATETIME,"
        . "transportToStationTime DATETIME,"
        . "ambulanceCalled DATETIME,"
        . "ambulanceArrived DATETIME,"
        . "timeCode4 DATETIME,"
        . "notes VARCHAR(640)"
        . "PRIMARY KEY (firstAidID))";

echo "Submitting First Aid Log Table to Database \n";

mysqli_query($link, $createQuery);

echo "Building Security Log Table \n";

$createQuery = "CREATE TABLE securityLog ("
        . "secID INT NOT NULL AUTO_INCREMENT,"
        . "reportType VARCHAR(32),"
        . "locationType INT,"
        . "location INT,"
        . "callRecTime DATETIME,"
        . "callDispatchTime DATETIME,"
        . "unitResponding VARCHAR(32),"
        . "unitOnSite DATETIME,"
        . "involvedDescription VARCHAR(640),"
        . "disposition VARCHAR(64),"
        . "timeCode4 DATETIME,"
        . "PRIMARY KEY (secID))";

echo "Submitting Security Log Table to Database \n";

mysqli_query($link, $createQuery);

echo "Building Guest Comment Log Table (In Alpha) \n";

$createQuery = "CREATE TABLE commentLog ("
        . "commentID INT NOT NULL AUTO_INCREMENT,"
        . "interactionType VARCHAR(24),"
        . "involvedDepartments VARCHAR(140),"
        . "locationType INT,"
        . "location INT,"
        . "involvedTMs VARCHAR(240),"
        . "notes VARCHAR(640),"
        . "guestID INT,"
        . "interactionSource INT,"
        . "representativeRequired INT,"
        . "representativeInvolved VARCHAR(64),"
        . "repNotes VARCHAR(640),"
        . "compGiven INT,"
        . "gaveTickets INT,"
        . "ticketsCount INT,"
        . "gaveRefund INT,"
        . "refundAmount DOUBLE,"
        . "gaveMeals INT,"
        . "mealsCount INT,"
        . "gaveRapidRides INT,"
        . "rapidRideType INT,"
        . "rapidRideCount INT,"
        . "PRIMARY KEY (commentID))";

echo "Submitting Comments Table to Database \n";

mysqli_query($link, $createQuery);

echo "Building Locations Table \n";

$createQuery = "CREATE TABLE location ("
        . "locationID INT NOT NULL AUTO_INCREMENT,"
        . "locationTypeID INT,"
        . "locationName VARCHAR(64),"
        . "locationUnitCount INT,"
        . "PRIMARY KEY (location))";

echo "Submitting Locations table to Database \n";

mysqli_query($link, $createQuery);

echo "Building Location Types Repository \n";

$createQuery = "CREATE TABLE locationTypes ("
        . "locationTypeID INT NOT NULL AUTO_INCREMENT,"
        . "typeName VARCHAR(64),"
        . "responsibleDepartmentID INT,"
        . "PRIMARY KEY (locationTypeID))";

echo "Submitting Location Repository to Database \n";

mysqli_query($link, $createQuery);

echo "Creating Vehicle Location Types Repository \n";

$createQuery = "CREATE TABLE vehicleLocations ("
        . "vehLocID INT NOT NULL AUTO_INCREMENT,"
        . "vehLocName VARCHAR(64),"
        . "PRIMARY KEY (vehLocID))";

echo "Submitting Vehicle Location Types Repository \n";

mysqli_query($link, $createQuery);

echo "Building Users Table \n";

$createQuery = "CREATE TABLE users ("
        . "userID INT NOT NULL AUTO_INCREMENT,"
        . "userLogin VARCHAR(20),"
        . "userName VARCHAR(64),"
        . "userHashedPass VARCHAR(256),"
        . "userAccessLevel INT,"
        . "PRIMARY KEY (userID))";

echo "Submitting Users Table to Database \n";

mysqli_query($link, $createQuery);

echo "Building Access Levels Database \n";

$createQuery = "CREATE TABLE accessLevels ("
        . "accessID INT NOT NULL AUTO_INCREMENT,"
        . "accessLevelName VARCHAR(64),"
        . "rightsList VARCHAR(240),"
        . "PRIMARY KEY (accessID))";

echo "Submitting Access Levels to Database \n";

mysqli_query($link, $createQuery);


}