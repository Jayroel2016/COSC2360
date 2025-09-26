"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Project 05-03

      Project to create a table of headings from an article
      Author:Luke Jayroe 
      Date:9/25/25  

      Filename: project05-03.js
*/

// Reference the article and TOC
let sourceDoc = document.getElementById("source_doc");
let toc = document.getElementById("toc");
let headingCount = 1;
const heading = "H2";

// Loop through children of sourceDoc
for (let n = sourceDoc.firstElementChild; n !== null; n = n.nextElementSibling) {
   if (n.nodeName === heading) {
      // Create anchor before heading
      let anchor = document.createElement("a");
      anchor.name = "doclink" + headingCount;
      n.insertBefore(anchor, n.firstChild);

      // Create list item with link
      let listItem = document.createElement("li");
      let link = document.createElement("a");
      link.textContent = n.textContent;
      link.href = "#doclink" + headingCount;

      listItem.appendChild(link);
      toc.appendChild(listItem);

      headingCount++;
   }
}