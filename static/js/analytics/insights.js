/* ============================================================
   ANALYTICS MODULE
   insights.js
   ============================================================ */

import { analyticsStore } from "./store.js";
import { CURRENT_CONDITION } from "../flights/data.js";

/* ============================================================
   GENERATE & RENDER INSIGHTS
   ============================================================ */

export function generateInsights() {

    renderTrafficInsight();

    renderDelayInsight();

    renderWeatherInsight();

    renderTerminalInsight();

}


/* ============================================================
   TRAFFIC INSIGHT
   ============================================================ */

function renderTrafficInsight() {

    const hourly = analyticsStore.charts.hourlyTraffic;

    if (!hourly.length) return;

    const peak = Math.max(...hourly);

    const hour = hourly.indexOf(peak);

    document.getElementById("trafficInsight").textContent =
        `Peak traffic expected between ${String(hour).padStart(2,"0")}:00 and ${String(hour + 1).padStart(2,"0")}:00 with ${peak} scheduled flights.`;

}


/* ============================================================
   DELAY INSIGHT
   ============================================================ */

function renderDelayInsight() {

    const summary = analyticsStore.summary;

    const delayRate = summary.totalFlights === 0

        ? 0

        : ((summary.delayed / summary.totalFlights) * 100).toFixed(1);

    let message;

    if (delayRate < 10) {

        message = `Delay rate is ${delayRate}%. Operations are running normally.`;

    }

    else if (delayRate < 20) {

        message = `Delay rate is ${delayRate}%. Minor operational delays observed.`;

    }

    else {

        message = `Delay rate is ${delayRate}%. Airport congestion is increasing.`;

    }

    document.getElementById("delayInsight").textContent = message;

}


/* ============================================================
   WEATHER INSIGHT
   ============================================================ */

function renderWeatherInsight() {

    let message = "";

    switch (CURRENT_CONDITION) {

        case "NORMAL":

            message = "Weather conditions are favorable for flight operations.";

            break;

        case "RAIN":

            message = "Rain may cause minor departure delays.";

            break;

        case "FOG":

            message = "Reduced visibility procedures are currently active.";

            break;

        case "LOW_VISIBILITY":

            message = "Low visibility procedures are in effect.";

            break;

        case "THUNDERSTORM":

            message = "Thunderstorm activity may affect runway operations.";

            break;

    }

    document.getElementById("weatherInsight").textContent = message;

}


/* ============================================================
   TERMINAL INSIGHT
   ============================================================ */

function renderTerminalInsight() {

    const terminals = {};

    analyticsStore.summary;

    const flights = Object.values(
        window.flightStore?.flights ?? []
    );

    flights.forEach(flight => {

        terminals[flight.terminal] =
            (terminals[flight.terminal] || 0) + 1;

    });

    const busiest = Object.entries(terminals)
        .sort((a,b)=>b[1]-a[1])[0];

    if (!busiest) return;

    document.getElementById("terminalInsight").textContent =
        `${busiest[0]} is currently handling the highest flight volume (${busiest[1]} flights).`;

}


/* ============================================================
   COMPATIBILITY EXPORT
   ============================================================ */

export function renderInsights() {

    // Intentionally empty.
    // generateInsights() already updates the UI directly.

}