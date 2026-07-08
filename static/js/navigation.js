/* ==========================================================
   NAVIGATION ACTIVE PAGE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const currentPath = window.location.pathname;

    document.querySelectorAll(".nav-menu a, .nav-footer a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPath) {

            link.classList.add("active");

        }

    });

});