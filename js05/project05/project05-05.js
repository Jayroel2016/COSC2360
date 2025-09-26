"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Project 05-05

      Project to create a Concentration game with flipping tiles
      Author: Luke Jayroe
      Date: 9/25/25  

      Filename: project05-05.js
*/

// Reference to the game board
let board = document.getElementById("board");

// Reference to the tiles within the game board
let allTiles = document.getElementsByClassName("tile");

// Objects that will reference the first and second tile clicked by the player
let firstFlipped;
let secondFlipped;

// Variable containing the id of a timed command
let timeID;

// Counter of the number of tiles currently flipped
let tilesFlipped = 0;

// Functions to run when the page is loaded
window.addEventListener("load", scrambleTiles);
window.addEventListener("load", playConcentration);

// Function that scrambles the order of the tiles within the board
function scrambleTiles() {
   for (let i = 0; i < allTiles.length; i++) {  
      let randomIndex = Math.floor(allTiles.length * Math.random());
      board.insertBefore(board.children[randomIndex], board.children[i]);
   }
}

// Function that sets up the game play
function playConcentration() {
   for (let i = 0; i < allTiles.length; i++) {
      allTiles[i].onclick = function () {
         if (this.lastElementChild.className === "back") {  
            tilesFlipped++;

            if (tilesFlipped === 1) {                       
               firstFlipped = this;                        
               firstFlipped.appendChild(firstFlipped.firstElementChild);
            } else if (tilesFlipped === 2) {                
               secondFlipped = this;                        
               secondFlipped.appendChild(secondFlipped.firstElementChild);
               timeID = window.setTimeout(flipBack, 1000);  
            }
         }
      };
   }

   function flipBack() {
      if (firstFlipped.firstElementChild.src !== secondFlipped.firstElementChild.src) {
         firstFlipped.appendChild(firstFlipped.firstElementChild);
         secondFlipped.appendChild(secondFlipped.firstElementChild);
      }
      tilesFlipped = 0; 
   }
}

