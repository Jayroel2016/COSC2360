"use strict";
/*  JavaScript 7th Edition
    Chapter 10
    Project 10-03

    Boulder Cycling Directions
    Author: Luke Jayroe
    Date: [Enter Date]

    Filename: project10-03.js
*/

function showMap() {

   // Page objects
   let bikeMap = document.getElementById("bikeMap");
   let bikeDirections = document.getElementById("bikeDirections");
   let startingPoint = document.getElementById("startingPoint");
   let endingPoint = document.getElementById("endingPoint");

   // Step 1: Create Directions Service and Renderer
   let bikeFind = new google.maps.DirectionsService();
   let bikeDraw = new google.maps.DirectionsRenderer();

   // Step 2: Set up Boulder map center
   let Boulder = new google.maps.LatLng(40.01753, -105.26496);

   // Step 3: Instantiate map
   let myMap = new google.maps.Map(bikeMap, {
      zoom: 12,
      center: Boulder,
      mapTypeId: "terrain"
   });

   // Step 4: Event listeners for route drawing
   startingPoint.addEventListener("change", drawRoute);
   endingPoint.addEventListener("change", drawRoute);

   // Step 5: Define drawRoute() function
   function drawRoute() {
      if (startingPoint.selectedIndex !== 0 && endingPoint.selectedIndex !== 0) {

         // Build route request
         let bikeRoute = {
            origin: startingPoint.value,
            destination: endingPoint.value,
            travelMode: google.maps.TravelMode.BICYCLING
         };

         // Request directions
         bikeFind.route(bikeRoute, function(result, status) {
            if (status === "OK") {
               bikeDraw.setDirections(result);
               bikeDraw.setMap(myMap);
               bikeDraw.setPanel(bikeDirections);
            } else {
               bikeDirections.textContent = "Directions Unavailable: " + status;
            }
         });
      }
   }
}


