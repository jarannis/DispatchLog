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

// stores the reference to the XMLHttpRequest object
var xmlHttp = createXmlHttpRequestObject();

// retrieves the XMPHttpRequest Object
function createXmlHttpRequestObject()
{
    // will store the reference to the XMLHttpRequestObject
    
    // if running Internet Explorer
    if(window.ActiveXObject)
    {
        try
        {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e)
        {
            xmlHttp = false;
        }
    }
    // if running Mozilla or Other Browsers
    else
    {
        try
        {
            xmlHttp = new XMLHttpRequest();
        }
        catch (e)
        {
            xmlHttp = false;
        }
    }
    
    // return the created object or display an error message
    if (!xmlHttp)
        alert("Error creating the XMLHttpRequest object.");
    else
        return xmlHttp;
}

// make asynchronous HTTP request using the XMLHttpRequest object
function process()
{
    // proceed only if the xmlHttp object isn't busy
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0)
    {
        // retrieve the name typed by the user on the form
        name = encodeURIComponent(document.getElementById("myName").value);
        //execute the quickstart.php page from the server
        xmlHttp.open("GET", "quickstart.php?name=" + name, true);
        //define the method to handle server responses
        xmlHttp.onreadystatechange = handleServerResponse;
        // make the server request
        xmlHttp.send(null);
    }
    else
        //if the connection is busy, try again after one second
        setTimeout('process()', 1000);
}
    
function handleServerResponse()
{
    // move forward only if the transaction has completed
    if (xmlHttp.readyState == 4)
    {
        // status of 200 indicates the transaction completed successfully
        if (xmlHttp.status == 200)
        {
            // extract the XML retrieved from the server
            xmlResponse = xmlHttp.responseXML;
            // obtain the document element (the root element) of the XML structure
            xmlDocumentElement = xmlResponse.documentElement;
            // get the text messgae which is in the first child of
            // the documen element
            helloMessage = xmlDocumentElement.firstChild.data;
            // update the client display using the data received from the server
            document.getElementById("divMessage").innerHTML = '<i>' + helloMessage + '</i>';
            // restart sequence
            setTimeout('process()', 1000);
        }
        // an http status different than 200 signals an error
        else
        {
            alert("There was a problem accessing the server: " + xmlHttp.statusText);
        }
    }
}