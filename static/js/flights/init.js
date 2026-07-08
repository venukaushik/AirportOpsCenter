/* ============================================================
   FLIGHTS MODULE - INIT
   init.js
   ============================================================ */

import { generateFlights } from "./generator.js";
import { renderFlights } from "./renderer.js";
import { initializeDrawer } from "./drawer.js";
import { initializeFilters } from "./filters.js";
import { initializeSorting } from "./sorting.js";

document.addEventListener("DOMContentLoaded", () => {

    console.log("Flights Module Initialized");

    generateFlights();

    initializeDrawer();

    initializeFilters();

    initializeSorting();

    renderFlights();

});