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


function process()
{
    // create the first text node
    oHello = document.createTextNode("Hello Dude! Here's a cool list of colors for you:");
    
    // create the <ul> element
    oUl = document.createElement("ul");
    
    // create the first <li> element and add a text node to it
    oLiBlack = document.createElement("li");
    oBlack = document.createTextNode("black");
    oLiBlack.appendChild(oBlack);
    
    // create the second <li> element and add a text node to it
    oLiOrange = documet.createElement("li");
    oOrange = document.createTextNode("Orange");
    oLiOrange.appendChild(oOrange);
    
    // create the third <li> element and add a text node to it
    oLiPink = document.createElement("li");
    oPink = document.createTextNode("Pink");
    oLiPink.appendChild(oPink);
    
    oUl.appendChild(oLiBlack);
    oUl.appendChild(oLiOrange);
    oUl.appendChild(oLiPink);
    
    // obtain a reference to the <div> element on the page
    myDiv = document.getElementById("myDivElement");
    
    // add content to the <div> element
    myDiv.appendChild(oHello);
    myDiv.appendChild(oUl);
}
