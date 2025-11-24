"use strict";
/*    JavaScript 7th Edition
      Chapter 12
      Project 12-03

      Project to show a recipe with expanding/contracting content
      Author: Luke Jayroe
      Date: 09/23/2025

      Filename: project12-03.js
*/

$("article > h2").click(function(e) {

   let heading = $(e.currentTarget);
   let list = heading.next();
   let headingImage = heading.children("img");

   list.slideToggle(500);

   let symbol = headingImage.attr("src");

   if (symbol === "plus.png") {
      headingImage.attr("src", "minus.png");
   } else {
      headingImage.attr("src", "plus.png");
   }

});