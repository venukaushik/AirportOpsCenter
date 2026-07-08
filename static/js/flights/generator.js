/* ============================================================
   FLIGHTS MODULE - GENERATOR
   generator.js
   ============================================================ */

   import {
    AIRLINES,
    DOMESTIC_ROUTES,
    INTERNATIONAL_ROUTES,
    AIRCRAFT_TYPES,
    GATES,
    STANDS,
    BELTS,
    CHECKIN_ROWS,
    TIMING_RULES,
    DELAY_REASONS,
    FLIGHT_STATUS
} from "./data.js";

import {
    randomItem,
    randomBoolean,
    randomTimeToday,
    generateFlightNumber,
    addMinutes,
    subtractMinutes,
    cloneDate,
    weightedChoice,
    randomDelay,
    randomInt,
    minutesBetween,
    generateFlightId
} from "./utils.js";

import { flightStore } from "./store.js";

/* ============================================================
   CONFIGURATION
   ============================================================ */

const FLIGHT_CONFIG = {
  TOTAL_FLIGHTS: 120,

  TERMINALS: ["T1", "T2", "T3"],
};

/* ============================================================
   GENERATE ALL FLIGHTS
   ============================================================ */


export function generateFlights() {

    // flightStore.flights.length = 0;

    flightStore.flights = [];
    // flightStore.filteredFlights = [...flightStore.flights];

    for (let i = 1; i <= FLIGHT_CONFIG.TOTAL_FLIGHTS; i++) {

        const type = randomBoolean()
            ? "Arrival"
            : "Departure";

        const airline = randomItem(AIRLINES);

        const route = type === "Arrival"
            ? randomArrivalRoute()
            : randomDepartureRoute();

        const scheduledTime = randomTimeToday();

        const flight = {

            id: generateFlightId(),

            type,

            airline,

            flightNumber: generateFlightNumber(airline.code),

            route,

            terminal: randomItem(FLIGHT_CONFIG.TERMINALS),

            aircraft: randomItem(AIRCRAFT_TYPES),

            scheduledTime,

            estimatedTime: null,

            actualTime: null,

            gate: null,

            stand: null,

            belt: null,

            checkIn: null,

            timing: null,

            status: FLIGHT_STATUS.SCHEDULED,

            remarks: "",

            delayReason: null

        };

        generateEstimatedTime(flight);

        assignResources(flight);

        assignStatus(flight);

        assignDelayReason(flight);

        flightStore.flights.push(flight);

    }

    sortFlights();

    flightStore.filteredFlights = [...flightStore.flights];

}

/* ============================================================
   ROUTE SELECTION
   ============================================================ */

function randomArrivalRoute() {
  const allRoutes = [...DOMESTIC_ROUTES, ...INTERNATIONAL_ROUTES];

  return randomItem(allRoutes);
}

function randomDepartureRoute() {
  const allRoutes = [...DOMESTIC_ROUTES, ...INTERNATIONAL_ROUTES];

  return randomItem(allRoutes);
}

/* ============================================================
   ESTIMATED TIME
   ============================================================ */

function generateEstimatedTime(flight) {
  if (flight.type === "Arrival") {
    const result = weightedChoice([
      {
        value: "EARLY",
        weight: TIMING_RULES.ARRIVAL.EARLY,
      },
      {
        value: "ON_TIME",
        weight: TIMING_RULES.ARRIVAL.ON_TIME,
      },
      {
        value: "DELAYED",
        weight: TIMING_RULES.ARRIVAL.DELAYED,
      },
    ]);

    flight.timing = result;

    if (result === "EARLY") {
      const minutes = randomDelay(
        TIMING_RULES.ARRIVAL.EARLY_MINUTES.min,
        TIMING_RULES.ARRIVAL.EARLY_MINUTES.max,
      );

      flight.estimatedTime = subtractMinutes(flight.scheduledTime, minutes);
    } else if (result === "DELAYED") {
      const minutes = randomDelay(
        TIMING_RULES.ARRIVAL.DELAY_MINUTES.min,
        TIMING_RULES.ARRIVAL.DELAY_MINUTES.max,
      );

      flight.estimatedTime = addMinutes(flight.scheduledTime, minutes);
    } else {
      flight.estimatedTime = cloneDate(flight.scheduledTime);
    }
  } else {
    const result = weightedChoice([
      {
        value: "ON_TIME",
        weight: TIMING_RULES.DEPARTURE.ON_TIME,
      },
      {
        value: "DELAYED",
        weight: TIMING_RULES.DEPARTURE.DELAYED,
      },
    ]);

    flight.timing = result;

    if (result === "DELAYED") {
      const minutes = randomDelay(
        TIMING_RULES.DEPARTURE.DELAY_MINUTES.min,
        TIMING_RULES.DEPARTURE.DELAY_MINUTES.max,
      );

      flight.estimatedTime = addMinutes(flight.scheduledTime, minutes);
    } else {
      flight.estimatedTime = cloneDate(flight.scheduledTime);
    }
  }
}

/* ============================================================
   RESOURCE ALLOCATION
   ============================================================ */

function assignResources(flight) {
  flight.gate = randomItem(GATES);

  flight.stand = randomItem(STANDS);

  if (flight.type === "Arrival") {
    flight.belt = randomItem(BELTS);

    flight.checkIn = null;
  } else {
    const row = randomItem(CHECKIN_ROWS);

    const start = randomInt(1, 20);

    flight.checkIn = `${row}${start}-${start + 3}`;

    flight.belt = null;
  }
}

/* ============================================================
   FLIGHT STATUS
   ============================================================ */

function assignStatus(flight) {
  const now = new Date();

  const scheduled = flight.scheduledTime;
  const estimated = flight.estimatedTime;

  const minutesToFlight = minutesBetween(now, estimated);

  /* ==========================
       ARRIVALS
    ========================== */

  if (flight.type === "Arrival") {
    if (minutesToFlight > 60) {
      if (flight.timing === "EARLY") {
        flight.status = FLIGHT_STATUS.EARLY;
      } else if (flight.timing === "DELAYED") {
        flight.status = FLIGHT_STATUS.DELAYED;
      } else {
        flight.status = FLIGHT_STATUS.ESTIMATED;
      }
    } else if (minutesToFlight > 0) {
      flight.status = FLIGHT_STATUS.ESTIMATED;
    } else if (minutesToFlight > -20) {
      flight.status = FLIGHT_STATUS.LANDED;
    } else {
      flight.status = FLIGHT_STATUS.ARRIVED;
    }
  } else {

  /* ==========================
       DEPARTURES
    ========================== */
    if (minutesToFlight > 90) {
      if (flight.timing === "DELAYED") {
        flight.status = FLIGHT_STATUS.DELAYED;
      } else {
        flight.status = FLIGHT_STATUS.SCHEDULED;
      }
    } else if (minutesToFlight > 45) {
      flight.status = FLIGHT_STATUS.CHECK_IN_OPEN;
    } else if (minutesToFlight > 20) {
      flight.status = FLIGHT_STATUS.GATE_OPEN;
    } else if (minutesToFlight > 10) {
      flight.status = FLIGHT_STATUS.BOARDING;
    } else if (minutesToFlight > 0) {
      flight.status = FLIGHT_STATUS.FINAL_CALL;
    } else {
      flight.status = FLIGHT_STATUS.DEPARTED;
    }
  }
}

/* ============================================================
   DELAY REASON
   ============================================================ */

function assignDelayReason(flight) {
  if (flight.timing === "DELAYED") {
    flight.delayReason = randomItem(DELAY_REASONS);
  }
}

/* ============================================================
   SORT FLIGHTS
   ============================================================ */

function sortFlights() {

    flightStore.flights.sort((a, b) => {

        return a.scheduledTime - b.scheduledTime;

    });

}
