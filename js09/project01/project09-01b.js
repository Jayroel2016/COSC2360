"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Project 09-01
      Project to read field values from a query string
      Author: Luke Jayroe
      Date: 11/01/2025
      Filename: project09-01b.js
*/

// Retrieve query string and remove '?'
let query = location.search.slice(1);

// Replace '+' characters with spaces
query = query.replace(/\+/g, " ");

// Decode any URI-encoded characters
query = decodeURIComponent(query);

// Split the query into name=value pairs
let cardFields = query.split("&");

// Loop through each pair and assign text content
for (let field of cardFields) {
   let nameValue = field.split("=");
   let name = nameValue[0];
   let value = nameValue[1];
   document.getElementById(name).textContent = value;
}

