"use strict";
/*    JavaScript 7th Edition
      Chapter 10
      Project 10-01

      Project to create a drag and drop jigsaw puzzle
      Author: Luke Jayroe
      Date: 11/8/25

      Filename: project10-01.js
*/

// Reference to the puzzle board
let puzzleBoard = document.getElementById("puzzleBoard");
// Counter for the zIndex style of each puzzle piece
let zCounter = 1;
// Array of integers from 1 to 48
let intList = new Array(48);
// pointerX and pointerY will contain the initial coordinates of the pointer
// pieceX and pieceY will contain the initial coordinates of a puzzle piece
let pointerX, pointerY, pieceX, pieceY;

// Sort the integers from 1 to 48 in random order
for (let i = 0; i < 48; i++) {
   intList[i] = i + 1;
}
intList.sort(() => 0.5 - Math.random());

// Generate randomly-sorted puzzle pieces
for (let i = 0; i < 48; i++) {
   let piece = document.createElement("img");
   piece.src = "piece" + intList[i] + ".png";
   let rowNum = Math.ceil((i + 1) / 8);
   let colNum = (i + 1) - (rowNum - 1) * 8;
   piece.style.top = (rowNum - 1) * 98 + 7 + "px";
   piece.style.left = (colNum - 1) * 98 + 7 + "px";
   piece.draggable = false; // disable native drag behavior
   puzzleBoard.appendChild(piece);
}

// Node list representing the puzzle pieces
let pieces = document.querySelectorAll("div#puzzleBoard img");

// Add event listeners for pointerdown on each piece
for (let i = 0; i < pieces.length; i++) {
   pieces[i].addEventListener("pointerdown", grabPiece);
}

// Function to grab and start dragging a piece
function grabPiece(e) {
   pointerX = e.clientX;
   pointerY = e.clientY;
   e.target.style.touchAction = "none";
   zCounter++;
   e.target.style.zIndex = zCounter;
   pieceX = e.target.offsetLeft;
   pieceY = e.target.offsetTop;

   e.target.addEventListener("pointermove", movePiece);
   e.target.addEventListener("pointerup", dropPiece);
}

// Function to move the piece with the pointer
function movePiece(e) {
   let diffX = e.clientX - pointerX;
   let diffY = e.clientY - pointerY;
   e.target.style.left = pieceX + diffX + "px";
   e.target.style.top = pieceY + diffY + "px";
}

// Function to drop the piece and remove listeners
function dropPiece(e) {
   e.target.removeEventListener("pointermove", movePiece);
   e.target.removeEventListener("pointerup", dropPiece);
}