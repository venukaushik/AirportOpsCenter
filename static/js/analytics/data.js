// ==========================================
// Analytics Data Service
// ==========================================

import { analyticsStore } from "./store.js";

import { flights } from "../flights/generator.js";

import {
    countBy,
    objectToArray,
    groupFlightsByHour,
    sortDescending
} from "./utils.js";



// ==========================================
// Load Analytics Data
// ==========================================

function loadAnalyticsData() {

    analyticsStore.flights = [...window.flights];

    analyticsStore.filteredFlights = [...window.flights];

}



// ==========================================
// Build Analytics
// ==========================================

export function buildAnalytics() {

    const data = analyticsStore.filteredFlights;

    buildAirlineStats(data);

    buildRouteStats(data);

    buildDelayStats(data);

    buildRunwayStats(data);

    buildHourlyTraffic(data);

}



// ==========================================
// Airline Statistics
// ==========================================

function buildAirlineStats(flights) {

    const counts = countBy(flights, "airline");

    analyticsStore.airlines = sortDescending(
        objectToArray(counts)
    );

}



// ==========================================
// Route Statistics
// ==========================================

function buildRouteStats(flights) {

    const counts = countBy(flights, "route");

    analyticsStore.routes = sortDescending(
        objectToArray(counts)
    );

}



// ==========================================
// Delay Statistics
// ==========================================

function buildDelayStats(flights) {

    const delayedFlights = flights.filter(flight =>
        flight.status === "Delayed"
    );

    const counts = countBy(delayedFlights, "delayReason");

    analyticsStore.delays = sortDescending(
        objectToArray(counts)
    );

}



// ==========================================
// Runway Usage
// ==========================================

function buildRunwayStats(flights) {

    const counts = countBy(flights, "runway");

    analyticsStore.runways = sortDescending(
        objectToArray(counts)
    );

}



// ==========================================
// Hourly Traffic
// ==========================================

function buildHourlyTraffic(flights) {

    analyticsStore.peakHours = groupFlightsByHour(flights);

}