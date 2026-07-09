/* ============================================================
   ANALYTICS MODULE - STORE
   store.js
   ============================================================ */

export const analyticsStore = {

    summary: {

        totalFlights: 0,
        arrivals: 0,
        departures: 0,
        delayed: 0,
        onTime: 0,
        cancelled: 0

    },

charts: {

    hourlyTraffic: [],

    airlineTraffic: [],

    statusDistribution: [],

    aircraftDistribution: [],

    otp: {},

    terminalTraffic: {},

    delayDistribution:{},

    passengerTraffic: [],
    
    topRoutes: []

},

    insights: []

};