/* ============================================================
   FLIGHT DRAWER
   drawer.js
   ============================================================ */

let selectedFlight = null;


/* ============================================================
   OPEN DRAWER
   ============================================================ */

function openDrawer(flight) {

    selectedFlight = flight;

    const drawer = document.getElementById("flightDrawer");

    drawer.classList.add("active");

    loadDrawer(flight);

}


/* ============================================================
   CLOSE DRAWER
   ============================================================ */

function closeDrawer() {

    document
        .getElementById("flightDrawer")
        .classList.remove("active");

}


/* ============================================================
   EVENTS
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("closeDrawer")
        .addEventListener("click", closeDrawer);

});

/* ============================================================
   LOAD DRAWER
   ============================================================ */

function loadDrawer(flight) {

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