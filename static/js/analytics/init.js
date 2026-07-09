/* ============================================================
   ANALYTICS MODULE
   init.js
   ============================================================ */

import { flightStore } from "../flights/store.js";

import { generateFlights } from "../flights/generator.js";

import { calculateAnalytics } from "./calculations.js";

import { renderAnalytics } from "./renderer.js";

import { initializeCharts } from "./charts.js";

import { generateInsights, renderInsights } from "./insights.js";


/* ============================================================
   INITIALIZE
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    initializeAnalytics();

});


/* ============================================================
   ANALYTICS INITIALIZATION
   ============================================================ */

export function initializeAnalytics() {

    console.log("Analytics Module Initialized");

    // Generate sample flight data only if none exists
    if (flightStore.flights.length === 0) {

        generateFlights();

    }

    refreshAnalytics();

}


/* ============================================================
   REFRESH ANALYTICS
   ============================================================ */

export function refreshAnalytics() {

    calculateAnalytics();

    generateInsights();

    renderAnalytics();

    initializeCharts();

    renderInsights();

}

