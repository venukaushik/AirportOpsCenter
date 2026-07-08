document.addEventListener("DOMContentLoaded", () => {

    updateClock();

    loadDashboard();

    rotateAlerts();

    setInterval(updateClock, 1000);

    setInterval(loadDashboard, 10000);

});


// ======================
// Dashboard Data
// ======================

async function loadDashboard() {

    try {

        const response = await fetch("/api/dashboard");

        const data = await response.json();

        // Total Flights = Arrivals + Departures
        const totalFlights = data.arrivals + data.departures;

        animateCounter("flightCount", totalFlights);

        animateCounter("departures", data.departures);

        animateCounter("arrivals", data.arrivals);

        updateStatus(data.status);

    }

    catch (err) {

        console.error(err);

    }

}


// ======================
// Animated Counter
// ======================

function animateCounter(id, target) {

    const element = document.getElementById(id);

    if (!element)
        return;

    let current = Number(element.innerText);

    if (isNaN(current))
        current = 0;

    const increment = (target - current) / 40;

    const timer = setInterval(() => {

        current += increment;

        if (
            (increment > 0 && current >= target) ||
            (increment < 0 && current <= target)
        ) {

            current = target;

            clearInterval(timer);

        }

        element.innerText = Math.round(current);

    }, 20);

}


// ======================
// Airport Status
// ======================


// ======================
// Alerts
// ======================

const alerts = [

    "🟢 Runway 28 Operational",

    "🛫 AI302 Boarding Gate A12",

    "🛬 6E214 Landed Successfully",

    "🟡 UK955 Delayed 10 Minutes",

    "🌤 Weather Clear",

    "🚌 Passenger Bus En Route",

    "🛄 Belt 4 Active"

];


function rotateAlerts() {

    const list = document.getElementById("alerts");

    if (!list)
        return;

    function update() {

        list.innerHTML = "";

        const shuffled = [...alerts]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);

        shuffled.forEach(alert => {

            const li = document.createElement("li");

            li.innerText = alert;

            li.style.marginBottom = "12px";

            list.appendChild(li);

        });

    }

    update();

    setInterval(update, 5000);

}

const radarCard = document.getElementById("radarCard");

if (radarCard) {

    radarCard.addEventListener("click", function () {

        window.location.href = "/radar";

    });

}