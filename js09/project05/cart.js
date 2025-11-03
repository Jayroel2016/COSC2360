"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Project 09-05

      Project to display shopping cart web storage
      Author: Luke Jayroe
      Date: 11/02/2025

      Filename: cart.js
*/

// Page Object
let cartContainer = document.getElementById("cartContainer");

window.addEventListener("load", displayCart);

function displayCart() {
   // Fix: use getItem with correct key name
   if (sessionStorage.getItem("itemsInCart")) {
      let itemTotal = parseInt(sessionStorage.getItem("itemsInCart"));

      // Build the table structure
      let cartTable = document.createElement("table");
      cartTable.id = "cartTable";
      let tableHeader = `
         <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Price</th>
         </tr>`;
      cartTable.innerHTML = tableHeader;

      // Loop through each cart item
      for (let i = 1; i <= itemTotal; i++) {
         // Fix: retrieve using correct key and delimiter
         let productArr = sessionStorage.getItem("cartItem" + i).split("&");

         let newRow = document.createElement("tr");

         // Product name
         let productCell = document.createElement("td");
         productCell.textContent = productArr[0];
         newRow.appendChild(productCell);

         // Description (size + color)
         let descriptionCell = document.createElement("td");
         descriptionCell.textContent = productArr[3] + ", " + productArr[4];
         newRow.appendChild(descriptionCell);

         // Quantity
         let qtyCell = document.createElement("td");
         qtyCell.textContent = productArr[2];
         newRow.appendChild(qtyCell);

         // Price
         let priceCell = document.createElement("td");
         priceCell.textContent = productArr[1];
         newRow.appendChild(priceCell);

         cartTable.appendChild(newRow);
      }

      cartContainer.appendChild(cartTable);
   } else {
      cartContainer.innerHTML = "<p style='text-align:center;'>Your shopping cart is empty.</p>";
   }
}