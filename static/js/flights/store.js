/* ============================================================
   FLIGHTS MODULE - STORE
   store.js
   ============================================================ */

/**
 * Central state for the Flights module.
 *
 * Every file reads or updates this object instead of creating
 * duplicate global variables.
 */

export const flightStore = {

    // Master flight list
    flights: [],

    // Flights currently displayed after filtering
    filteredFlights: [],

    // Drawer selection
    selectedFlight: null,

    // Active filters
    filters: {

        search: "",

        type: "All",

        airline: "All",

        status: "All"

    },

    // Sorting
    sorting: {

        column: "scheduledTime",

        direction: "asc"

    }

};