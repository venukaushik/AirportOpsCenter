/* ============================================================
   FLIGHTS MODULE - FILTERS
   filters.js
   ============================================================ */

let filteredFlights = [];

/* ============================================================
   INITIALIZE FILTERS
   ============================================================ */

function initializeFilters() {
  populateAirlineFilter();

  document
    .getElementById("flightSearch")
    .addEventListener("input", applyFilters);

  document
    .getElementById("flightView")
    .addEventListener("change", applyFilters);

  document
    .getElementById("flightStatus")
    .addEventListener("change", applyFilters);

  document
    .getElementById("airlineFilter")
    .addEventListener("change", applyFilters);

  document
    .getElementById("clearFilters")
    .addEventListener("click", clearFilters);

  document
    .getElementById("refreshFlights")
    .addEventListener("click", refreshFlights);
}

function clearFilters() {
  document.getElementById("flightSearch").value = "";
  document.getElementById("flightView").value = "all";
  document.getElementById("flightStatus").value = "";
  document.getElementById("airlineFilter").value = "";
  applyFilters();
}

/* ============================================================
   APPLY FILTERS
   ============================================================ */

function applyFilters() {
  const search = document.getElementById("flightSearch").value.toLowerCase();

  const type = document.getElementById("flightView").value;

  const status = document.getElementById("flightStatus").value;

  const airline = document.getElementById("airlineFilter").value;

  filteredFlights = flights.filter((flight) => {
    const searchMatch =
      flight.flightNumber.toLowerCase().includes(search) ||
      flight.airline.name.toLowerCase().includes(search) ||
      flight.route.toLowerCase().includes(search);

    const typeMatch = type === "all" || flight.type.toLowerCase() === type;

    const statusMatch = status === "" || flight.status === status;

    const airlineMatch = airline === "" || flight.airline.name === airline;

    return searchMatch && typeMatch && statusMatch && airlineMatch;
  });

  renderFlights(filteredFlights);
  updateTableColumns(type);
}

/* ============================================================
   AIRLINE DROPDOWN
   ============================================================ */

function populateAirlineFilter() {
  const select = document.getElementById("airlineFilter");

  AIRLINES.forEach((airline) => {
    const option = document.createElement("option");

    option.value = airline.name;

    option.textContent = airline.name;

    select.appendChild(option);
  });
}

function updateTableColumns(view) {
  const gateHeader = document.getElementById("gateHeader");
  const beltHeader = document.getElementById("beltHeader");

  const rows = document.querySelectorAll("#flightTableBody tr");

  if (view === "arrival") {
    gateHeader.style.display = "none";
    beltHeader.style.display = "";

    rows.forEach((row) => {
      row.cells[6].style.display = "none"; // Gate
      row.cells[7].style.display = ""; // Belt
    });
  } else if (view === "departure") {
    gateHeader.style.display = "";
    beltHeader.style.display = "none";

    rows.forEach((row) => {
      row.cells[6].style.display = ""; // Gate
      row.cells[7].style.display = "none"; // Belt
    });
  } else {
    gateHeader.style.display = "";
    beltHeader.style.display = "";

    rows.forEach((row) => {
      row.cells[6].style.display = "";
      row.cells[7].style.display = "";
    });
  }
}

/* ==========================================================
   REFRESH FLIGHTS
========================================================== */

function refreshFlights() {
    showLoader(
        "Refreshing Flights",
        "Generating latest flight information..."
    );

    setTimeout(() => {

        generateFlights();

        applyFilters();

        hideLoader();

    }, 1500);

}