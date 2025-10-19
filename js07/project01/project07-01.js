"use strict";
/*
   JavaScript 7th Edition
   Chapter 7
   Project 07-01

   Project to validate a form used for setting up a new account
   Author: Luke Jayroe
   Date: October 17, 2025

   Filename: project07-01.js
*/

let signupForm = document.getElementById("signup");

signupForm.addEventListener("submit", function(e) {
   e.preventDefault();

   let pwd = document.getElementById("pwd").value;
   let feedback = document.getElementById("feedback");

   // Regular expressions
   let regex1 = /[A-Z]/;         // At least one uppercase letter
   let regex2 = /\d/;            // At least one digit
   let regex3 = /[!$#%]/;        // At least one special symbol

   if (pwd.length < 8) {
      feedback.textContent = "Your password must be at least 8 characters.";
   } else if (!regex1.test(pwd)) {
      feedback.textContent = "Your password must include an uppercase letter.";
   } else if (!regex2.test(pwd)) {
      feedback.textContent = "Your password must include a number.";
   } else if (!regex3.test(pwd)) {
      feedback.textContent = "Your password must include one of the following: !$#%.";
   } else {
      feedback.textContent = "";
      signupForm.submit();
   }
});