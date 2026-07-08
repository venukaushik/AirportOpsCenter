/* ============================================================
   FLIGHTS MODULE - RENDERER
   renderer.js
   ============================================================ */

import { flightStore } from "./store.js";
import { formatTimeHHMM } from "./utils.js";
import { openDrawer } from "./drawer.js";

/* ============================================================
   RENDER FLIGHTS
   ============================================================ */

export function renderFlights() {

    const tableBody = document.getElementById("flightTableBody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    flightStore.filteredFlights.forEach((flight) => {

        const row = document.createElement("tr");

        const flightIcon =
            flight.type === "Arrival"
                ? '<i class="fas fa-plane-arrival"></i>'
                : '<i class="fas fa-plane-departure"></i>';

        const estimatedClass =
            flight.timing === "EARLY"
                ? "time-early"
                : flight.timing === "DELAYED"
                    ? "time-delayed"
                    : "";

        let statusClass = "";

        switch (flight.status) {

            case "Scheduled":
                statusClass = "scheduled";
                break;

            case "Estimated":
                statusClass = "landing";
                break;

            case "Boarding":
                statusClass = "boarding";
                break;

            case "Gate Open":
                statusClass = "checkin";
                break;

            case "Check-in Open":
                statusClass = "checkin";
                break;

            case "Final Call":
                statusClass = "finalcall";
                break;

            case "Delayed":
                statusClass = "delayed";
                break;

            case "Landed":
                statusClass = "landing";
                break;

            case "Arrived":
                statusClass = "arrived";
                break;

            case "Departed":
                statusClass = "departed";
                break;

            default:
                statusClass = "scheduled";

        }

        row.innerHTML = `
            <td>${flight.flightNumber}</td>

            <td>${flight.airline.name}</td>

            <td>${flightIcon} &nbsp; ${flight.type}</td>

            <td>${flight.route}</td>

            <td>${formatTimeHHMM(flight.scheduledTime)}</td>

            <td class="${estimatedClass}">
                ${formatTimeHHMM(flight.estimatedTime)}
            </td>

            <td>${flight.gate ?? "-"}</td>

            <td>${flight.belt ?? "-"}</td>

            <td>${flight.aircraft}</td>

            <td>
                <span class="status ${statusClass}">
                    ${flight.status}
                </span>
            </td>
        `;

        row.addEventListener("click", () => {

            openDrawer(flight);

        });

        tableBody.appendChild(row);

    });

}