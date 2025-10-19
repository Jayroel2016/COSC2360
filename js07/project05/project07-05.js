"use strict";
/*    JavaScript 7th Edition
      Chapter 7
      Project 07-05

      Project to compare the distribution of word lengths between two authors
      Author: Luke Jayroe
      Date: October 19, 2025

      Filename: project07-05.js
*/

// Onchange event handler to load an external file for author 1
document.getElementById("button1").onchange = function() {
   // Retrieve the selected file for author 1
   let file = this.files[0];
   let doc = document.getElementById("document1");
   let count = document.getElementById("count1");
   
   // Generate the word frequency table for author 1
   generateWordFreq(file, doc, count);
};

// Onchange event handler to load an external file for author 2
document.getElementById("button2").onchange = function() {
   // Retrieve the selected file for author 2
   let file = this.files[0];
   let doc = document.getElementById("document2");
   let count = document.getElementById("count2");
   
   // Generate the word frequency table for author 2
   generateWordFreq(file, doc, count);
};


// Function that generates a table of frequencies for words
// of 1 to 15 characters in length
function generateWordFreq(inputFile, outputDoc, outputCount) {
   // Read the contents of the selected file
   let fr = new FileReader();
   fr.readAsText(inputFile); 

   // Once the file has finished loading, display the document in the page
   fr.onload = function() { 
      // Show the raw text in the page
      outputDoc.textContent = fr.result;
      
      // Store the text content of the output document (avoid HTML tags)
      let sourceText = outputDoc.textContent;
      
      // Remove any character that is not alphabetic or whitespace
      let alphaRegx = /[^a-zA-Z\s]/g;
      sourceText = sourceText.replace(alphaRegx, "");  

      // Split the text into an array at each occurrence of one or more whitespace characters
      let words = sourceText.split(/\s+/); 

      // Initial frequency array for words of 1 to 15 characters in length
      // Index 0 is unused; index 1..14 store exact length; index 15 stores 15+
      let freqs = new Array(16).fill(0);

      // Loop through every word in the words array
      for (let i = 0; i < words.length; i++) {
         let wlen = words[i].length;
         if (wlen >= 15) {
            freqs[15]++;
         } else {
            freqs[wlen]++;
         }
      }

      // Store the total number of words in the sample text (ignore zero-length entries)
      let totalWords = words.filter(w => w.length > 0).length;
      
      // Loop through the 15 entries in the freqs array
      // Ignore the 0th index, since we don't count words of 0 length
      let outputPara = outputCount.getElementsByTagName("p");
      for (let i = 1; i <= 15; i++) {
         // Calculate the percent of words of each length
         // Display the frequency to 1 decimal place
         let percent = totalWords ? ((freqs[i] / totalWords) * 100).toFixed(1) + "%" : "0.0%";
         outputPara[i - 1].textContent = percent;
      }      
   }; 
}