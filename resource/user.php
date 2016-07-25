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
if (isset($_POST['submit'])){
    if (empty($_POST['username']) || empty($_POST['password'])) {
        $errorMsg = "Username or Password is invalid";
    }
    else{
        // define Username and Password
        $username = $_POST['username'];
        $password = $_POST['password'];
        require_once "mysq.init.php";
        $query = mysqli_query($link, "select * from users where password='$password' AND username='$username'");
        $rows = mysqli_num_rows($query);
        if ($rows == 1){
            $_SESSION['logUser']=$username; // init session
        }
        else{
            $errorMsg = "Username or Password is invalid";
        }
    }
    mysqli_close($link);
}
