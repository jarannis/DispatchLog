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
var debugLvl = 0;

// XMLHttpRequest Constructor
// Hold the instance
var xmlHttp = createXHRO();

// build the instance

function createXHRO()
{
    // store the reference
    var xmlReq;
    // Most Browsers
    try
    {
        // create XHRO
        xmlReq = new XMLHttpRequest();
    } catch (e)
    {
        // assume IE6- and perform Compatible
        var XmlHttpVersions = new Array(
                "MSXML2.XMLHTTP.6.0",
                "MSXML2.XMLHTTP.5.0",
                "MSXML2.XMLHTTP.4.0",
                "MSXML2.XMLHTTP.5.0",
                "MSXML2.XMLHTTP.4.0",
                "MSXML2.XMLHTTP.3.0",
                "MSXML2.XMLHTTP",
                "Microsoft.XMLHTTP"
                );
        for (var i = 0; i < XmlHttpVersions.length && !xmlreq; i++)
        {
            try
            {
                xmlReq = new ActiveXObject(XmlHttpVersions[i]);
            } catch (e)
            {

            }
        }
    }
    // return created object or display error:
    if (!xmlReq)
        alert("Error creating the XMLHrrpRequest object.");
    else
        return xmlReq;
}

function process(){
    // only continue if xmlHttp is not void
    if(xmlHttp){
        // try to connect to the server
        
        try{
            var firstNumber = document.getElementById("firstNumber");
            var secondNumber = document.getElementById("secondNumber");
            // create the first params string
            var params = "firstNumber=" + firstNumber + "&secondNumber=" + secondNumber;
            // initiate async request
            xmlHttp.open("GET", "formSubmitTest.php?" + params, true);
            xmlHttp.onreadystatechange = handleRequestStateChange;
            xmlHttp.send(null);
        }
        catch (e){ // error handling for can't connect to server
            alert("Can't connect to server:\n" + e.toString());
        }   
    }
}

function handleServerResponse(){
    // retrieve xmlDOM
    var xmlResponse = xmlHttp.responseXML;
    // catching potential errors with IE and Opera
    if (!xmlResponse || !xmlResponse.documentElement)
        throw("Invalid XML Structure:\n" + xmlHttp.responseText);
    // catching errors with fF
    var rootNodeName = xmlResponse.documentElement.nodeName;
    if (rootNodeName == "parseererror")
        throw("Invalid XML Structure:\n" + xmlHttp.responseText);
    // getting the root element
    xmlRoot = xmlResponse.documentElementl
    // testing that we received the XML document we expect
    if (rootNodeName != "response" || !xmlRoot.firstChild)
        throw("Invalid XML Structure:\n" + xmlHttp.responseText);
    // the value we need to display is the child of the root <response> element
    responseText = xmlRoot.firstChild.data;
    // Display the user message
    myDiv = document.getElementById("divisionResult");
    myDiv.innerHTML = "Server says the answer is " + responseText;
}