/* ============================================================
   ANALYTICS MODULE
   renderer.js
   ============================================================ */

import { analyticsStore } from "./store.js";

/* ============================================================
   RENDER DASHBOARD
   ============================================================ */

export function renderAnalytics() {

    renderSummary();

    renderOperationalMetrics();

}


/* ============================================================
   SUMMARY CARDS
   ============================================================ */

function renderSummary() {

    const summary = analyticsStore.summary;

    setValue("analyticsTotalFlights", summary.totalFlights);

    setValue("analyticsArrivals", summary.arrivals);

    setValue("analyticsDepartures", summary.departures);

    setValue("analyticsDelayed", summary.delayed);

    setValue("analyticsOnTime", summary.onTime);

    setValue("analyticsCancelled", summary.cancelled);

}


/* ============================================================
   OPERATIONAL METRICS
   ============================================================ */

function renderOperationalMetrics() {

    const summary = analyticsStore.summary;

    const delayPercentage = summary.totalFlights === 0
        ? 0
        : ((summary.delayed / summary.totalFlights) * 100).toFixed(1);

    setValue("analyticsDelayRate", `${delayPercentage}%`);

    setValue(
        "analyticsOnTimeRate",
        `${(100 - delayPercentage).toFixed(1)}%`
    );

    setValue(
        "analyticsArrivalDepartureRatio",
        `${summary.arrivals} : ${summary.departures}`
    );

    setValue(
    "otp",
    `${analyticsStore.charts.otp.onTime}%`
);

}


/* ============================================================
   DOM HELPER
   ============================================================ */

function setValue(id, value) {

    const element = document.getElementById(id);

    if (!element) return;

    element.textContent = value;

}