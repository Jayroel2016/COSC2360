// script.js
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");
  if (!form) { console.error("Order form not found."); return; }

  const sizeSel = document.getElementById("size");
  const qtyInput = document.getElementById("qty");
  const toppingBoxes = Array.from(document.querySelectorAll('input[name="toppings"]'));
  const crustRadios = Array.from(document.querySelectorAll('input[name="crust"]'));
  const payRadios = Array.from(document.querySelectorAll('input[name="payment"]'));

  const cardFields = document.getElementById("cardFields");
  const cardName   = document.getElementById("cardName");
  const cardNumber = document.getElementById("cardNumber");
  const exp        = document.getElementById("exp");
  const cvv        = document.getElementById("cvv");

  const totalEl  = document.getElementById("total");
  const summary  = document.getElementById("orderSummary");
  const formError = document.getElementById("formError");

  const ERR = {
    size: document.getElementById("error-size"),
    qty: document.getElementById("error-qty"),
    crust: document.getElementById("error-crust"),
    payment: document.getElementById("error-payment"),
    fullname: document.getElementById("error-fullname"),
    email: document.getElementById("error-email"),
    terms: document.getElementById("error-terms"),
    cardName: document.getElementById("error-cardName"),
    cardNumber: document.getElementById("error-cardNumber"),
    exp: document.getElementById("error-exp"),
    cvv: document.getElementById("error-cvv"),
  };

  const pricePerTopping = 1.25;
  const money = n => `$${n.toFixed(2)}`;

  function calcTotal(){
    const base = Number(sizeSel.options[sizeSel.selectedIndex]?.dataset.price || 0);
    const toppingsCount = toppingBoxes.filter(cb => cb.checked).length;
    const qty = Number(qtyInput.value || 0);
    const total = (base + toppingsCount * pricePerTopping) * (qty || 0);
    totalEl.textContent = money(isFinite(total) ? total : 0);
  }

  function getPayment(){
    const it = payRadios.find(r => r.checked);
    return it ? it.value : "";
  }

  function toggleCardFields(){
    const show = getPayment() === "Card";
    cardFields.style.display = show ? "grid" : "none";
    [cardName, cardNumber, exp, cvv].forEach(el => {
      if (show) el.setAttribute("required", "");
      else { el.removeAttribute("required"); el.value = ""; el.setCustomValidity(""); }
    });
  }

  function validateCard(){
    if (getPayment() !== "Card") return true;

    const num = (cardNumber.value || "").trim();
    if (!/^\d{13,19}$/.test(num)) cardNumber.setCustomValidity("Enter 13–19 digits.");
    else cardNumber.setCustomValidity("");

    const m = (exp.value || "").trim().match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    if (!m) {
      exp.setCustomValidity("Use MM/YY.");
    } else {
      const mm = Number(m[1]), yy = Number(m[2]);
      const now = new Date();
      const year = 2000 + yy;
      const endOfMonth = new Date(year, mm, 0, 23, 59, 59);
      exp.setCustomValidity(endOfMonth >= now ? "" : "Card expired.");
    }

    if (!/^\d{3,4}$/.test((cvv.value || "").trim())) cvv.setCustomValidity("3 or 4 digits.");
    else cvv.setCustomValidity("");

    return cardNumber.checkValidity() && exp.checkValidity() && cvv.checkValidity() && cardName.checkValidity();
  }

  function showFieldError(field, msg){ if (ERR[field]) ERR[field].textContent = msg || ""; }
  function clearErrors(){
    formError.textContent = "";
    Object.values(ERR).forEach(el => el.textContent = "");
  }

  function validateForm(){
    clearErrors();
    let ok = form.checkValidity();

    const qty = Number(qtyInput.value);
    if (!(qty >= 1)) { qtyInput.setCustomValidity("Please enter at least 1."); ok = false; }
    else qtyInput.setCustomValidity("");

    if (!crustRadios.some(r => r.checked)) { showFieldError("crust","Please choose a crust."); ok = false; }
    if (!payRadios.some(r => r.checked))   { showFieldError("payment","Select a payment method."); ok = false; }

    if (getPayment() === "Card") {
      if (!validateCard()) ok = false;
      showFieldError("cardName", cardName.validationMessage);
      showFieldError("cardNumber", cardNumber.validationMessage);
      showFieldError("exp",       exp.validationMessage);
      showFieldError("cvv",       cvv.validationMessage);
    }

    if (!sizeSel.checkValidity()) showFieldError("size","Choose a size.");
    if (!qtyInput.checkValidity()) showFieldError("qty", qtyInput.validationMessage);

    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    if (!fullname.checkValidity()) showFieldError("fullname","Please enter your name.");
    if (!email.checkValidity())    showFieldError("email","Enter a valid email.");

    const terms = document.getElementById("terms");
    if (!terms.checkValidity()) showFieldError("terms","You must confirm your details.");

    if (!ok) formError.textContent = "Please fix the errors highlighted above and try again.";
    return ok;
  }

  // Wire events
  [sizeSel, qtyInput, ...toppingBoxes].forEach(el => {
    el.addEventListener("change", calcTotal);
    el.addEventListener("input",  calcTotal);
  });
  crustRadios.forEach(r => r.addEventListener("change", () => showFieldError("crust","")));
  payRadios.forEach(r => r.addEventListener("change", () => { showFieldError("payment",""); toggleCardFields(); }));

  document.getElementById("resetBtn").addEventListener("click", () => {
    setTimeout(() => {
      clearErrors();
      toggleCardFields();
      calcTotal();
      summary.style.display = "none";
      summary.innerHTML = "";
    }, 0);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();                  // stop page reload
    if (!validateForm()) return;
    const sizeLabel = sizeSel.options[sizeSel.selectedIndex]?.textContent.split("—")[0].trim() || "";
    const crust = crustRadios.find(r=>r.checked)?.value || "";
    const toppings = toppingBoxes.filter(cb=>cb.checked).map(cb=>cb.value);
    const qty = Number(qtyInput.value || 0);
    const pay = getPayment();
    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const total = totalEl.textContent;

    summary.innerHTML = `
      <div><strong class="success">Success!</strong> Your order has been captured (not actually charged).</div>
      <div class="hr"></div>
      <div><strong>Customer:</strong> ${name} (${email})</div>
      <div><strong>Pizza:</strong> ${qty} × ${sizeLabel} on ${crust}</div>
      <div><strong>Toppings:</strong> ${toppings.length ? toppings.join(", ") : "None"}</div>
      <div><strong>Payment:</strong> ${pay}${pay==="Card" ? " (authorized)" : ""}</div>
      <div><strong>Total:</strong> ${total}</div>
    `;
    summary.style.display = "block";
    formError.textContent = "";
  });

  // Init
  toggleCardFields();
  calcTotal();
});