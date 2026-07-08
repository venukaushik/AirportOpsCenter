/* ============================================================
   FLIGHTS MODULE - INIT
   init.js
   ============================================================ */
console.log("init.js loaded");

import { generateFlights } from "./generator.js";
import { renderFlights } from "./render.js";
import { initializeFilters } from "./filters.js";
import { initializeSorting } from "./sorting.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Ready");

  generateFlights();

  console.log("Flights generated:", flights);
  
  initializeFilters();

  initializeSorting();

  renderFlights();
});
