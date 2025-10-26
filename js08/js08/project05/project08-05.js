"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Project 08-05

      Interface to replay a chess game stored in a JSON file
      Author: Luke Jayroe
      Date: 10/26/2025

      Filename: project08-05.js
*/

/*--------------------- Interface Code -------------------*/

let moveLog = document.getElementById("moveLog");
let moveSpans = moveLog.getElementsByTagName("span");
let nextButton = document.getElementById("nextButton");
let prevButton = document.getElementById("prevButton");
let getLogButton = document.getElementById("getLog");
let blackBox = document.getElementById("blackBox");
let whiteBox = document.getElementById("whiteBox");
let titleBox = document.getElementById("title");
let descBox = document.getElementById("description");

getLogButton.onchange = function() {
   let JSONfile = this.files[0];
   let fr = new FileReader();
   fr.readAsText(JSONfile);

   fr.onload = function() {
      // ✅ Fixed JSON capitalization
      let game = JSON.parse(fr.result);
      
      titleBox.textContent = game.title;
      descBox.textContent = game.description;
      writeMoveLog(game.moves);

      // ✅ Fixed missing 'new'
      let mySet = new chessSet(game);
      setupBoard(mySet);
      
      nextButton.onclick = function() {
         if (game.move < game.moves.length - 1) {
            showNextBoard(game);           
         }
      };
      prevButton.onclick = function() {
         if (game.move > -1) {
            showPrevBoard(game);           
         }
      };
   };
};