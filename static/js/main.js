// static/js/main.js

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();

    updateClock();

    setInterval(updateClock, 1000);

});


function initializeNavigation() {

    const currentPath = window.location.pathname;

    document.querySelectorAll(".nav-link").forEach(link => {

        if (link.getAttribute("href") === currentPath) {

            link.classList.add("active");

        }

    });

}


function updateClock() {

    const now = new Date();

    const time = document.getElementById("currentTime");

    const date = document.getElementById("currentDate");

    if (time) {

        time.textContent = now.toLocaleTimeString();

    }

    if (date) {

        date.textContent = now.toLocaleDateString(undefined, {

            weekday: "long",

            day: "2-digit",

            month: "short",

            year: "numeric"

        });

    }

}

document.addEventListener("DOMContentLoaded", () => {

    const currentPath = window.location.pathname;

    document.querySelectorAll(".sidebar-menu a").forEach(link => {

        if (link.getAttribute("href") === currentPath) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

});