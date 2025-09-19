/*    JavaScript 7th Edition
      Chapter 4
      Project 04-05

      Degrees <-> Radians Coverter
      Author: Luke Jayroe
      Date: 9/18/25  

      Filename: project04-05.js
 */


// Function to convert degrees to radians 
function degreesToRadians(degrees) { 
   return Number(degrees) * Math.PI / 180; 
}

// Function to convert radians to degrees
function radiansToDegrees(radians) {
   return Number(radians) * 180 / Math.PI; 
}

/* ================================================================
   Event handlers
   ================================================================ */

// Convert radians -> degrees when radians input changes
document.getElementById("rValue").onchange = function() {        
   const radians = document.getElementById("rValue").value;      
   console.log("Radians = " + radians);                          
   document.getElementById("aValue").value = formatValue3(radiansToDegrees(radians)); 
};

// Convert degrees -> radians when degrees input changes
document.getElementById("aValue").onchange = function() {
   const degrees = document.getElementById("aValue").value;
   console.log("Degrees = " + degrees);                          
   document.getElementById("rValue").value = formatValue3(degreesToRadians(degrees)); 
};

/* ================================================================
   Utilities
   ================================================================ */

// Function to display a numeric value in the format ##.### 
function formatValue3(value) {
   return Number(value).toFixed(3);
}