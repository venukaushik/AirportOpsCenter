/* ============================================================
   ANALYTICS MODULE
   charts.js
   ============================================================ */

import { analyticsStore } from "./store.js";

/* ============================================================
   CHART INSTANCES
   ============================================================ */

const charts = {
  flightOverview: null,

  otp: null,

  terminal: null,

  delay: null,

  passenger: null,
};

/* ============================================================
   INITIALIZE CHARTS
   ============================================================ */

export function initializeCharts() {

  destroyCharts();

  renderFlightOverviewChart();

  renderOtpChart();

  renderTerminalChart();

  renderDelayChart();
  
  renderPassengerChart();

  renderTopRoutes();

}

/* ============================================================
   DESTROY OLD CHARTS
   ============================================================ */

function destroyCharts() {
  Object.values(charts).forEach((chart) => {
    if (chart) {
      chart.destroy();
    }
  });
}

/* ============================================================
   FLIGHTS OVERVIEW
   ============================================================ */

function renderFlightOverviewChart() {
  const canvas = document.getElementById("flightOverviewChart");

  if (!canvas) {
    console.error("flightOverviewChart canvas not found");

    return;
  }

  charts.flightOverview = new Chart(canvas, {
    type: "line",

    data: {
      labels: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ],

      datasets: [
        {
          label: "Flights",

          data: analyticsStore.charts.hourlyTraffic,

          borderWidth: 3,

          tension: 0.35,

          fill: true,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false,
        },
      },

      scales: {
        y: {
          beginAtZero: true,

          ticks: {
            precision: 0,
          },
        },
      },
    },
  });
}

/* ============================================================
   ON-TIME PERFORMANCE
   ============================================================ */

function renderOtpChart() {
  const canvas = document.getElementById("otpChart");

  if (!canvas) return;

  charts.otp = new Chart(canvas, {
    type: "doughnut",

    data: {
      labels: ["On Time", "Delayed"],

      datasets: [
        {
          data: [
            analyticsStore.charts.otp.onTime,

            analyticsStore.charts.otp.delayed,
          ],

          borderWidth: 0,

          borderRadius: 10,

          spacing: 4,

          hoverOffset: 12,

          cutout: "78%",
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      animation: {
        duration: 1200,

        easing: "easeOutQuart",
      },
      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          callbacks: {
            label(context) {
              return `${context.label}: ${context.raw}%`;
            },
          },
        },
      },
    },
  });
}

/* ============================================================
   FLIGHTS BY TERMINAL
   ============================================================ */

function renderTerminalChart() {

    const canvas = document.getElementById("terminalChart");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const blue = ctx.createLinearGradient(0,0,0,250);
    blue.addColorStop(0,"#38bdf8");
    blue.addColorStop(1,"#2563eb");

    const green = ctx.createLinearGradient(0,0,0,250);
    green.addColorStop(0,"#4ade80");
    green.addColorStop(1,"#16a34a");

    const orange = ctx.createLinearGradient(0,0,0,250);
    orange.addColorStop(0,"#fb923c");
    orange.addColorStop(1,"#ea580c");

    charts.terminal = new Chart(canvas,{

        type:"bar",

        data:{

            labels:["T1","T2","T3"],

            datasets:[{

                data:[

                    analyticsStore.charts.terminalTraffic.T1,

                    analyticsStore.charts.terminalTraffic.T2,

                    analyticsStore.charts.terminalTraffic.T3

                ],

                backgroundColor:[

                    blue,
                    green,
                    orange

                ],

                borderRadius:12,

                borderSkipped:false,

                maxBarThickness:55

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{
                    display:false
                }

            },

            scales:{

                x:{

                    grid:{
                        display:false
                    }

                },

                y:{

                    beginAtZero:true,

                    ticks:{
                        precision:0
                    }

                }

            }

        }

    });

}

/* ============================================================
   DELAY DISTRIBUTION
   ============================================================ */

function renderDelayChart() {

    const canvas =
        document.getElementById("delayChart");

    if (!canvas) return;

    charts.delay = new Chart(canvas, {

        type: "pie",

        data: {

            labels: Object.keys(
                analyticsStore.charts.delayDistribution
            ),

            datasets: [{

                data: Object.values(
                    analyticsStore.charts.delayDistribution
                ),

                backgroundColor: [

                    "#22c55e",

                    "#3b82f6",

                    "#f59e0b",

                    "#ef4444",

                    "#8b5cf6"

                ],

                borderWidth: 2,

                borderColor: "#0b1724",

                hoverOffset: 18

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: {

                duration: 1400,

                easing: "easeOutQuart"

            },

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        boxWidth: 14,

                        padding: 18

                    }

                }

            }

        }

    });

}

/* ============================================================
   PASSENGER TRAFFIC
   ============================================================ */

function renderPassengerChart() {

    const canvas =
        document.getElementById("passengerChart");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0,0,0,260);

    gradient.addColorStop(0,"rgba(168,85,247,.55)");

    gradient.addColorStop(.5,"rgba(59,130,246,.25)");

    gradient.addColorStop(1,"rgba(59,130,246,0)");

    charts.passenger = new Chart(canvas,{

        type:"line",

        data:{

            labels:[

                "00","01","02","03","04","05",
                "06","07","08","09","10","11",
                "12","13","14","15","16","17",
                "18","19","20","21","22","23"

            ],

            datasets:[{

                label:"Passengers",

                data:analyticsStore.charts.passengerTraffic,

                fill:true,

                backgroundColor:gradient,

                borderColor:"#a855f7",

                borderWidth:3,

                pointRadius:3,

                pointHoverRadius:7,

                tension:.45

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{
                    display:false
                }

            },

            scales:{

                x:{

                    grid:{
                        display:false
                    }

                },

                y:{

                    beginAtZero:true

                }

            }

        }

    });

}

/* ============================================================
   TOP ROUTES
   ============================================================ */

function renderTopRoutes() {

    const container =
        document.getElementById("topRoutes");

    if (!container) return;

    container.innerHTML = "";

    const routes =
        analyticsStore.charts.topRoutes;

    const maxFlights = routes[0]?.[1] ?? 1;

    routes.forEach(([city, flights]) => {

        const percentage =
            (flights / maxFlights) * 100;

        const row = document.createElement("div");

        row.className = "route-row";

        row.innerHTML = `

            <div class="route-name">

                ${city}

            </div>

            <div class="route-bar">

                <div
                    class="route-progress"
                    style="width:${percentage}%">
                </div>

            </div>

            <div class="route-count">

                ${flights}

            </div>

        `;

        container.appendChild(row);

    });

}