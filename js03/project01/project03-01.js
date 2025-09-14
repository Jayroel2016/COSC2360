/*    JavaScript 7th Edition
      Chapter 3
      Project 03-01

      Application to calculate total order cost
      Author: Luke Jayroe
      Date:9/12/25 

      Filename: project03-01.js
*/

// Get all menu item checkboxes (matches class="menuItem" in the HTML)
var menuItems = document.getElementsByClassName("menuItem");

// Recalculate total whenever any checkbox is clicked
for (var i = 0; i < menuItems.length; i++) {
   menuItems[i].addEventListener("click", calcTotal);
}

// Calculate and display the order total
function calcTotal() {
   var orderTotal = 0;

   for (var i = 0; i < menuItems.length; i++) {
      if (menuItems[i].checked) {
         orderTotal += Number(menuItems[i].value);
      }
   }
   document.getElementById("billTotal").innerHTML = formatCurrency(orderTotal);
}

// Function to display a numeric value as a text string in the format $##.## 
function formatCurrency(value) {
   return "$" + value.toFixed(2);
}