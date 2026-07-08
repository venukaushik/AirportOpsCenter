/* ==========================================================
   FLIGHT SORTING
========================================================== */

let currentSort = "schedule";
let currentDirection = "asc";

/* ==========================================================
   SORT FIELD MAPPING
========================================================== */

const SORT_FIELDS = {
  flight: (flight) => flight.flightNumber,

  airline: (flight) => flight.airline?.name,

  type: (flight) => flight.type,

  route: (flight) => flight.route,

schedule: flight => flight.scheduledTime,

estimated: flight => flight.estimatedTime,

  gate: (flight) => flight.gate,

  belt: (flight) => flight.belt,

  aircraft: (flight) => flight.aircraft,
};

/* ==========================================================
   INITIALIZE SORTING
========================================================== */

function initializeSorting() {
  document
    .querySelectorAll("#flightTableHeader th[data-sort]")
    .forEach((header) => {
      header.addEventListener("click", () => {
        sortFlights(header.dataset.sort);
      });
    });
}

/* ==========================================================
   SORT FLIGHTS
========================================================== */

function sortFlights(column) {
  if (currentSort === column) {
    currentDirection = currentDirection === "asc" ? "desc" : "asc";
  } else {
    currentSort = column;
    currentDirection = "asc";
  }

  const data = filteredFlights.length > 0 ? filteredFlights : flights;

  data.sort((a, b) => {
    let valueA = getSortValue(a, column);
    let valueB = getSortValue(b, column);

    return compareValues(valueA, valueB);
  });

  renderFlights(data);

  updateSortIcons();
}

/* ==========================================================
   GET SORT VALUE
========================================================== */

function getSortValue(flight, column) {
  const getter = SORT_FIELDS[column];

  if (!getter) return "";

  let value = getter(flight);

  if (value === null || value === undefined) return "";

  return value;
}

/* ==========================================================
   COMPARE VALUES
========================================================== */

function compareValues(a, b) {
  if (typeof a === "string") a = a.toLowerCase();

  if (typeof b === "string") b = b.toLowerCase();

  if (a < b) return currentDirection === "asc" ? -1 : 1;

  if (a > b) return currentDirection === "asc" ? 1 : -1;

  return 0;
}

/* ==========================================================
   TIME TO MINUTES
========================================================== */

function timeToMinutes(time) {

    if (!time || time === "--")
        return -1;

    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;

}

/* ==========================================================
   SORT ICONS
========================================================== */

function updateSortIcons() {
  document.querySelectorAll(".sort-icon").forEach((icon) => {
    icon.className = "fas fa-sort sort-icon";
  });

  const active = document.querySelector(
    `[data-sort="${currentSort}"] .sort-icon`,
  );

  if (!active) return;

  active.className =
    currentDirection === "asc"
      ? "fas fa-sort-up sort-icon"
      : "fas fa-sort-down sort-icon";
}
