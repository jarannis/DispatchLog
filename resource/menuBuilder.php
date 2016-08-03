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

session_start();

$userpermission = "all";

// Dispatch Dashboard Button Builder
if($userPermission == "dispatcher" || 
        $userPermission == "manager" || 
        $userPermission == "all"){
    echo("<form name='DispatchDashboard'>"
            . "<input type=hidden name=destination value=dispatchdash />"
            . "<input type=submit name=submit value=submit/></form><br/>");
}

// Today's incidents button builder
if($userPermission == "dispatcher" || 
        $userPermission == "manager" ||
        $userPermission == "gr" ||
        $userPermission == "supervisor" ||
        $userPermission == "all"){
    echo("<form name='DispatchDashboard' target='./incidents.php'>"
            . "<input type=hidden name=type value='today'/>"
            . "<input type=hidden name=destination value=incidentsToday />"
            . "<input type=submit name=submit value=submit/></form><br/>");
}

// outstanding incidents button builder
if($userPermission == "dispatcher" || 
        $userPermission == "manager" ||
        $userPermission == "supervisor" ||
        $userPermission == "all"){
    echo("<form name='DispatchDashboard' target='./incidents.php'>"
            . "<input type=hidden name=type value='outstanding'/>"
            . "<input type=hidden name=destination value=incidentsOutstanding />"
            . "<input type=submit name=submit value=submit/></form><br/>");
}

// enter comment button builder
if($userPermission == "gr" || 
        $userPermission == "manager" ||
        $userPermission == "supervisor" ||
        $userPermission == "all"){
    echo("<form name='DispatchDashboard' target='./comments/enter.php'>"
            . "<input type=hidden name=destination value=commentEntry />"
            . "<input type=submit name=submit value=submit/></form><br/>");
}

// view comments button builder
if($userPermission == "gr" || 
        $userPermission == "manager" ||
        $userPermission == "supervisor" ||
        $userPermission == "all"){
    echo("<form name='DispatchDashboard' target='./comments/list.php'>"
            . "<input type=hidden name=destination value=commentView />"
            . "<input type=submit name=submit value=submit/></form><br/>");
}

// search commments button builder
if($userPermission == "supervisor" || 
        $userPermission == "manager" || 
        $userPermission == "all"){
    echo("<form name='DispatchDashboard' target='./comments/search.php'>"
            . "<input type=hidden name=destination value=commentSearch />"
            . "<input type=submit name=submit value=submit/></form><br/>");
}

// settings and configuration button builder
if($userPermission == "manager" || 
        $userPermission == "admin" || 
        $userPermission == "all"){
    echo("<form name='DispatchDashboard' target=''>"
            . "<input type=hidden name=destination value=settingsAndConf />"
            . "<input type=submit name=submit value=submit/></form><br/>");
}
