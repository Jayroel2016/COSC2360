"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Project 09-02

      Project to save field values to session storage
      Author: Luke Jayroe
      Date: 11/02/2025

      Filename: project09-02a.js
*/

/* Page Objects */
let riderName = document.getElementById("riderName");
let ageGroup = document.getElementById("ageGroup");
let bikeOption = document.getElementById("bikeOption");
let routeOption = document.getElementById("routeOption");
let accOption = document.getElementById("accOption");
let region = document.getElementById("region");
let miles = document.getElementById("miles");
let comments = document.getElementById("comments");

let submitButton = document.getElementById("submitButton");

// When the user clicks Submit, store all values in sessionStorage and go to page 2
submitButton.onclick = showData;

function showData() {
   // save each field to session storage
   sessionStorage.setItem("riderName", riderName.value);
   sessionStorage.setItem("ageGroup", ageGroup.value);
   sessionStorage.setItem("bikeOption", bikeOption.value);
   sessionStorage.setItem("routeOption", routeOption.value);
   sessionStorage.setItem("accOption", accOption.value);
   sessionStorage.setItem("region", region.value);
   sessionStorage.setItem("miles", miles.value);
   sessionStorage.setItem("comments", comments.value);

   // go to the "My Membership Information" page
   location.href = "project09-02b.html";
}