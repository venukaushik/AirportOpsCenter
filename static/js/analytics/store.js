// ===============================
// Analytics Store
// ===============================

export const analyticsStore = {

    // Raw flight data
    flights: [],

    // Filtered flights
    filteredFlights: [],

    // KPI values
    kpis: {
        totalFlights: 0,
        arrivals: 0,
        departures: 0,
        delayed: 0,
        cancelled: 0,
        onTimePercentage: 0
    },

    // Charts
    charts: {
        hourlyTraffic: null,
        airlineDistribution: null,
        delayReasons: null,
        runwayUsage: null
    },

    // Route statistics
    routes: [],

    // Airline statistics
    airlines: [],

    // Delay statistics
    delays: [],

    // Runway statistics
    runways: [],

    // Peak hour information
    peakHours: [],

    // Analytics insights
    insights: []

};