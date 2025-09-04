/*    JavaScript 7th Edition
      Chapter 2
      Project 02-01

      Celsius <-> Farenheit Coverter
      Author:Luke Jayroe 
      Date:9/4/25  

      Filename: project02-01.js
 */
// Celsius to Fahrenheit
function CelsiusToFahrenheit(degree) {
   return (degree * 1.8) + 32;
}

// Fahrenheit to Celsius
function FahrenheitToCelsius(degree) {
   return (degree - 32) / 1.8;
}

// Celsius input
document.getElementById("cValue").onchange = function() {
   let cDegree = document.getElementById("cValue").value;
   document.getElementById("fValue").value = CelsiusToFahrenheit(cDegree);
};

// Fahrenheit input
document.getElementById("fValue").onchange = function() {
   let fDegree = document.getElementById("fValue").value;
   document.getElementById("cValue").value = FahrenheitToCelsius(fDegree);
};