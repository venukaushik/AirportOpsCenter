/* ============================================================
   ANALYTICS MODULE
   calculations.js
   ============================================================ */

import { flightStore } from "../flights/store.js";
import { analyticsStore } from "./store.js";
import { randomInt } from "../flights/utils.js";

/* ============================================================
   CALCULATE ALL ANALYTICS
   ============================================================ */

export function calculateAnalytics() {
  calculateSummary();

  calculateHourlyTraffic();

  calculateAirlineTraffic();

  calculateStatusDistribution();

  calculateAircraftDistribution();

  calculateOtp();

  calculateTerminalTraffic();

  calculateDelayDistribution();

  calculatePassengerTraffic();

  calculateTopRoutes();
}

/* ============================================================
   SUMMARY
   ============================================================ */

function calculateSummary() {
  const flights = flightStore.flights;

  analyticsStore.summary.totalFlights = flights.length;

  analyticsStore.summary.arrivals = flights.filter(
    (f) => f.type === "Arrival",
  ).length;

  analyticsStore.summary.departures = flights.filter(
    (f) => f.type === "Departure",
  ).length;

  analyticsStore.summary.delayed = flights.filter(
    (f) => f.status === "Delayed",
  ).length;

  analyticsStore.summary.cancelled = flights.filter(
    (f) => f.status === "Cancelled",
  ).length;

  analyticsStore.summary.onTime =
    flights.length -
    analyticsStore.summary.delayed -
    analyticsStore.summary.cancelled;
}

/* ============================================================
   HOURLY TRAFFIC
   ============================================================ */

function calculateHourlyTraffic() {
  const hourly = new Array(24).fill(0);

  flightStore.flights.forEach((flight) => {
    const hour = flight.scheduledTime.getHours();

    hourly[hour]++;
  });

  analyticsStore.charts.hourlyTraffic = hourly;
}

/* ============================================================
   AIRLINE DISTRIBUTION
   ============================================================ */

function calculateAirlineTraffic() {
  const airlines = {};

  flightStore.flights.forEach((flight) => {
    const airline = flight.airline.name;

    airlines[airline] = (airlines[airline] || 0) + 1;
  });

  analyticsStore.charts.airlineTraffic = airlines;
}

/* ============================================================
   STATUS DISTRIBUTION
   ============================================================ */

function calculateStatusDistribution() {
  const status = {};

  flightStore.flights.forEach((flight) => {
    status[flight.status] = (status[flight.status] || 0) + 1;
  });

  analyticsStore.charts.statusDistribution = status;
}

/* ============================================================
   AIRCRAFT DISTRIBUTION
   ============================================================ */

function calculateAircraftDistribution() {
  const aircraft = {};

  flightStore.flights.forEach((flight) => {
    aircraft[flight.aircraft] = (aircraft[flight.aircraft] || 0) + 1;
  });

  analyticsStore.charts.aircraftDistribution = aircraft;
}

/* ============================================================
   ON-TIME PERFORMANCE
   ============================================================ */

function calculateOtp() {
  const summary = analyticsStore.summary;

  const otp =
    summary.totalFlights === 0
      ? 0
      : Math.round((summary.onTime / summary.totalFlights) * 100);

  analyticsStore.charts.otp = {
    onTime: otp,

    delayed: 100 - otp,
  };
}

/* ============================================================
   FLIGHTS BY TERMINAL
   ============================================================ */

function calculateTerminalTraffic() {
  const terminals = {
    T1: 0,
    T2: 0,
    T3: 0,
  };

  flightStore.flights.forEach((flight) => {
    terminals[flight.terminal]++;
  });

  analyticsStore.charts.terminalTraffic = terminals;
}

/* ============================================================
   DELAY DISTRIBUTION
   ============================================================ */

function calculateDelayDistribution() {
  const distribution = {
    "On Time": 0,

    "0-15 min": 0,

    "15-30 min": 0,

    "30-60 min": 0,

    "60+ min": 0,
  };

  flightStore.flights.forEach((flight) => {
    if (flight.timing !== "DELAYED") {
      distribution["On Time"]++;

      return;
    }

    const delay = Math.round(
      (flight.estimatedTime - flight.scheduledTime) / 60000,
    );

    if (delay <= 15) {
      distribution["0-15 min"]++;
    } else if (delay <= 30) {
      distribution["15-30 min"]++;
    } else if (delay <= 60) {
      distribution["30-60 min"]++;
    } else {
      distribution["60+ min"]++;
    }
  });

  analyticsStore.charts.delayDistribution = distribution;
}

/* ============================================================
   PASSENGER TRAFFIC
   ============================================================ */

function calculatePassengerTraffic() {

    const hourlyPassengers = new Array(24).fill(0);

    flightStore.flights.forEach(flight => {

        const hour = flight.scheduledTime.getHours();

        const passengers = randomInt(90, 320);

        hourlyPassengers[hour] += passengers;

    });

    analyticsStore.charts.passengerTraffic = hourlyPassengers;

}

/* ============================================================
   TOP ROUTES
   ============================================================ */

function calculateTopRoutes() {

    const routes = {};

    flightStore.flights.forEach(flight => {

        routes[flight.route] = (routes[flight.route] || 0) + 1;

    });

    analyticsStore.charts.topRoutes =
        Object.entries(routes)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

}