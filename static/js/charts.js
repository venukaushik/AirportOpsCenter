// static/js/charts.js

let flightStatusChart = null;
let trafficChart = null;

document.addEventListener("DOMContentLoaded", () => {
    initializeCharts();
});

async function initializeCharts() {
    await loadFlightStatusChart();
    await loadTrafficChart();
}

async function loadFlightStatusChart() {
    try {
        const response = await fetch("/api/dashboard/flight-status");

        if (!response.ok) {
            throw new Error("Failed to fetch flight status data.");
        }

        const data = await response.json();

        const ctx = document.getElementById("flightStatusChart");

        if (!ctx) return;

        if (flightStatusChart) {
            flightStatusChart.destroy();
        }

        flightStatusChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: data.labels,
                datasets: [{
                    label: "Flights",
                    data: data.values,
                    backgroundColor: [
                        "#198754",
                        "#ffc107",
                        "#dc3545",
                        "#0d6efd"
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });

    } catch (error) {
        console.error("Flight Status Chart Error:", error);
    }
}

const flightDistributionChart = new Chart(
    document.getElementById("flightDistributionChart"),
    {

        type: "doughnut",

        data: {

            labels: ["Arrivals", "Departures"],

            datasets: [{

                data: [120, 128],

                backgroundColor: [
                    "#36A2EB",
                    "#4CAF50"
                ],

                borderWidth: 0,

                hoverOffset: 10

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            cutout: "70%",

            radius: "90%",

            layout: {

                padding: 10

            },

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        color: "#ffffff",

                        padding: 18,

                        usePointStyle: true,

                        pointStyle: "circle"

                    }

                }

            }

        }

    }
);

async function loadTrafficChart() {

    try {

        const response = await fetch("/api/dashboard/traffic");

        if (!response.ok) {
            throw new Error("Failed to fetch traffic data.");
        }

        const data = await response.json();

        const ctx = document.getElementById("trafficChart");

        if (!ctx) return;

        if (trafficChart) {
            trafficChart.destroy();
        }

        trafficChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: data.labels,
                datasets: [{
                    label: "Flights",
                    data: data.values,
                    fill: false,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    } catch (error) {
        console.error("Traffic Chart Error:", error);
    }
}

async function refreshCharts() {
    await loadFlightStatusChart();
    await loadTrafficChart();
}

// Refresh every 5 minutes
setInterval(refreshCharts, 300000);
