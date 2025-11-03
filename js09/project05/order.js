"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Project 09-05

      Project to add orders to shopping cart web storage
      Author: Luke Jayroe
      Date: 11/02/2025

      Filename: order.js
*/

// Page Objects
let submitButton = document.getElementById("submitButton");
let product = document.getElementById("product");
let price = document.getElementById("price");
let quantity = document.getElementById("quantity");
let size = document.getElementById("size");
let color = document.getElementById("color");

submitButton.onclick = function() {
   let itemTotal;

   if (sessionStorage.getItem("itemsInCart")) {
      itemTotal = parseInt(sessionStorage.getItem("itemsInCart")) + 1;
   } else {
      itemTotal = 1;
   }

   //Fix: store value properly using string key
   sessionStorage.setItem("itemsInCart", itemTotal);

   // Fix: correctly join product info with "&"
   let itemText = product.value + "&" +
                  price.value + "&" +
                  quantity.value + "&" +
                  size.value + "&" +
                  color.value;

   // Fix: use sessionStorage.setItem (not sessionStorage.set)
   sessionStorage.setItem("cartItem" + itemTotal, itemText);

   alert(product.value + " has been added to your shopping cart!");
};