/* ============================================================
   FLIGHTS MODULE - SORTING
   sorting.js
   ============================================================ */

import { flightStore } from "./store.js";
import { renderFlights } from "./renderer.js";

/* ============================================================
   SORT FIELD MAPPING
   ============================================================ */

const SORT_FIELDS = {

    flight: (flight) => flight.flightNumber,

    airline: (flight) => flight.airline?.name,

    type: (flight) => flight.type,

    route: (flight) => flight.route,

    schedule: (flight) => flight.scheduledTime,

    estimated: (flight) => flight.estimatedTime,

    gate: (flight) => flight.gate,

    belt: (flight) => flight.belt,

    aircraft: (flight) => flight.aircraft

};


/* ============================================================
   INITIALIZE SORTING
   ============================================================ */

export function initializeSorting() {

    document
        .querySelectorAll("#flightTableHeader th[data-sort]")
        .forEach((header) => {

            header.addEventListener("click", () => {

                sortFlights(header.dataset.sort);

            });

        });

}


/* ============================================================
   SORT FLIGHTS
   ============================================================ */

function sortFlights(column) {

    if (flightStore.sorting.column === column) {

        flightStore.sorting.direction =
            flightStore.sorting.direction === "asc"
                ? "desc"
                : "asc";

    }

    else {

        flightStore.sorting.column = column;

        flightStore.sorting.direction = "asc";

    }

    flightStore.filteredFlights.sort((a, b) => {

        const valueA = getSortValue(a, column);

        const valueB = getSortValue(b, column);

        return compareValues(valueA, valueB);

    });

    renderFlights();

    updateSortIcons();

}


/* ============================================================
   GET SORT VALUE
   ============================================================ */

function getSortValue(flight, column) {

    const getter = SORT_FIELDS[column];

    if (!getter) return "";

    const value = getter(flight);

    return value ?? "";

}


/* ============================================================
   COMPARE VALUES
   ============================================================ */

function compareValues(a, b) {

    if (typeof a === "string") a = a.toLowerCase();

    if (typeof b === "string") b = b.toLowerCase();

    if (a < b) {

        return flightStore.sorting.direction === "asc"
            ? -1
            : 1;

    }

    if (a > b) {

        return flightStore.sorting.direction === "asc"
            ? 1
            : -1;

    }

    return 0;

}


/* ============================================================
   SORT ICONS
   ============================================================ */

function updateSortIcons() {

    document.querySelectorAll(".sort-icon").forEach((icon) => {

        icon.className = "fas fa-sort sort-icon";

    });

    const active = document.querySelector(

        `[data-sort="${flightStore.sorting.column}"] .sort-icon`

    );

    if (!active) return;

    active.className =

        flightStore.sorting.direction === "asc"

            ? "fas fa-sort-up sort-icon"

            : "fas fa-sort-down sort-icon";

}