"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Project 09-02

      Project to read field values from session storage
      Author: Luke Jayroe
      Date: 11/02/2025

      Filename: project09-02b.js
*/

/* Page Objects */
let riderNameCell = document.getElementById("riderName");
let ageGroupCell = document.getElementById("ageGroup");
let bikeOptionCell = document.getElementById("bikeOption");
let routeOptionCell = document.getElementById("routeOption");
let accOptionCell = document.getElementById("accOption");
let regionCell = document.getElementById("region");
let milesCell = document.getElementById("miles");
let commentsCell = document.getElementById("comments");

// Fill the table cells with the values from sessionStorage
riderNameCell.textContent   = sessionStorage.getItem("riderName");
ageGroupCell.textContent    = sessionStorage.getItem("ageGroup");
bikeOptionCell.textContent  = sessionStorage.getItem("bikeOption");
routeOptionCell.textContent = sessionStorage.getItem("routeOption");
accOptionCell.textContent   = sessionStorage.getItem("accOption");
regionCell.textContent      = sessionStorage.getItem("region");
milesCell.textContent       = sessionStorage.getItem("miles");
commentsCell.textContent    = sessionStorage.getItem("comments");