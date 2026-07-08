/* ============================================================
   FLIGHTS MODULE - DRAWER
   drawer.js
   ============================================================ */

import { flightStore } from "./store.js";
import { formatTimeHHMM, randomInt } from "./utils.js";

/* ============================================================
   OPEN DRAWER
   ============================================================ */

export function openDrawer(flight) {

    flightStore.selectedFlight = flight;

    const drawer = document.getElementById("flightDrawer");

    if (!drawer) return;

    drawer.classList.add("active");

    loadDrawer();

}


/* ============================================================
   CLOSE DRAWER
   ============================================================ */

export function closeDrawer() {

    const drawer = document.getElementById("flightDrawer");

    if (!drawer) return;

    drawer.classList.remove("active");

}


/* ============================================================
   EVENTS
   ============================================================ */

export function initializeDrawer() {

    const closeButton = document.getElementById("closeDrawer");

    if (!closeButton) return;

    closeButton.addEventListener("click", closeDrawer);

}


/* ============================================================
   LOAD DRAWER
   ============================================================ */

function loadDrawer() {

    const flight = flightStore.selectedFlight;

    if (!flight) return;

    document.getElementById("drawerFlight").textContent =
        flight.flightNumber;

    document.getElementById("drawerAirline").textContent =
        flight.airline.name;

    document.getElementById("drawerType").textContent =
        flight.type;

    document.getElementById("drawerRoute").textContent =
        flight.route;

    document.getElementById("drawerAircraft").textContent =
        flight.aircraft;

    document.getElementById("drawerSchedule").textContent =
        formatTimeHHMM(flight.scheduledTime);

    document.getElementById("drawerEstimated").textContent =
        formatTimeHHMM(flight.estimatedTime);

    document.getElementById("drawerGate").textContent =
        flight.gate ?? "-";

    document.getElementById("drawerBelt").textContent =
        flight.belt ?? "-";

    document.getElementById("drawerStatus").textContent =
        flight.status;

    document.getElementById("drawerTerminal").textContent =
        flight.terminal;

    document.getElementById("drawerPassengers").textContent =
        randomInt(90, 320);

    document.getElementById("drawerCrew").textContent =
        randomInt(6, 14);

    document.getElementById("drawerFuel").textContent =
        randomInt(35, 100) + "%";

    document.getElementById("drawerBaggage").textContent =
        randomInt(120, 420);

}