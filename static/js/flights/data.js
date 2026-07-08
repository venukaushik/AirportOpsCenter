/* ============================================================
   FLIGHTS MODULE - MASTER DATA
   data.js
   ============================================================ */

/* ============================================================
   AIRPORT
   ============================================================ */

const AIRPORT = {
  icao: "VIDP",
  iata: "DEL",
  name: "Indira Gandhi International Airport",
};

/* ============================================================
   AIRLINES
   ============================================================ */

const AIRLINES = [
  { code: "AI", icao: "AIC", name: "Air India" },
  { code: "6E", icao: "IGO", name: "IndiGo" },
  { code: "SG", icao: "SEJ", name: "SpiceJet" },
  { code: "UK", icao: "VTI", name: "Air India Express" },
  { code: "IX", icao: "AXB", name: "Air India Express Regional" },
  { code: "QP", icao: "AKJ", name: "Akasa Air" },
  { code: "I5", icao: "IAD", name: "AirAsia India" },

  { code: "EK", icao: "UAE", name: "Emirates" },
  { code: "QR", icao: "QTR", name: "Qatar Airways" },
  { code: "EY", icao: "ETD", name: "Etihad Airways" },
  { code: "SV", icao: "SVA", name: "Saudia" },
  { code: "TG", icao: "THA", name: "Thai Airways" },
  { code: "SQ", icao: "SIA", name: "Singapore Airlines" },
  { code: "LH", icao: "DLH", name: "Lufthansa" },
  { code: "BA", icao: "BAW", name: "British Airways" },
  { code: "CX", icao: "CPA", name: "Cathay Pacific" },
  { code: "MH", icao: "MAS", name: "Malaysia Airlines" },
];

/* ============================================================
   DOMESTIC ROUTES
   ============================================================ */

const DOMESTIC_ROUTES = [
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Goa",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Srinagar",
  "Chandigarh",
  "Amritsar",
  "Varanasi",
  "Patna",
  "Bhubaneswar",
  "Kochi",
  "Coimbatore",
  "Nagpur",
  "Guwahati",
];

/* ============================================================
   INTERNATIONAL ROUTES
   ============================================================ */

const INTERNATIONAL_ROUTES = [
  "Dubai",
  "Doha",
  "Abu Dhabi",
  "Singapore",
  "London",
  "Frankfurt",
  "Bangkok",
  "Kathmandu",
  "Colombo",
  "Paris",
  "Tokyo",
  "Hong Kong",
  "Muscat",
  "Jeddah",
  "Riyadh",
  "Kuala Lumpur",
  "Toronto",
  "Sydney",
];

/* ============================================================
   AIRCRAFT TYPES
   ============================================================ */

const AIRCRAFT_TYPES = [
  "A319",
  "A320",
  "A320neo",
  "A321",
  "A321neo",
  "A330",
  "A350",

  "B737-800",
  "B737 MAX 8",
  "B777-300ER",
  "B787-8",
  "B787-9",
];

/* ============================================================
   GATES
   ============================================================ */

const GATES = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
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
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
];

/* ============================================================
   STANDS
   ============================================================ */

const STANDS = [
  "R1",
  "R2",
  "R3",
  "R4",
  "R5",
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
  "B1",
  "B2",
  "B3",
  "B4",
  "B5",
  "C1",
  "C2",
  "C3",
  "C4",
  "C5",
];

/* ============================================================
   BAGGAGE BELTS
   ============================================================ */

const BELTS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

/* ============================================================
   CHECK-IN ROWS
   ============================================================ */

const CHECKIN_ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"];

/* ============================================================
   WEATHER / AIRPORT CONDITIONS
   ============================================================ */

const AIRPORT_CONDITIONS = {
  NORMAL: "NORMAL",
  RAIN: "RAIN",
  FOG: "FOG",
  LOW_VISIBILITY: "LOW_VISIBILITY",
  THUNDERSTORM: "THUNDERSTORM",
};

const CURRENT_CONDITION = AIRPORT_CONDITIONS.NORMAL;

/* ============================================================
   TIMING PROBABILITIES
   ============================================================ */

const TIMING_RULES = {
  ARRIVAL: {
    ON_TIME: 70,
    EARLY: 15,
    DELAYED: 15,

    EARLY_MINUTES: {
      min: 5,
      max: 20,
    },

    DELAY_MINUTES: {
      min: 5,
      max: 90,
    },
  },

  DEPARTURE: {
    ON_TIME: 82,
    DELAYED: 18,

    DELAY_MINUTES: {
      min: 5,
      max: 90,
    },
  },
};

/* ============================================================
   DELAY REASONS
   ============================================================ */

const DELAY_REASONS = [
  "Late Arrival of Aircraft",
  "Weather Conditions",
  "Air Traffic Congestion",
  "Technical Inspection",
  "Crew Availability",
  "Operational Reasons",
  "Security Checks",
  "Runway Restrictions",
];

/* ============================================================
   STATUSS
   ============================================================ */

const FLIGHT_STATUS = {
  SCHEDULED: "Scheduled",
  GATE_OPEN: "Gate Open",
  CHECK_IN_OPEN: "Check-in Open",
  BOARDING: "Boarding",
  FINAL_CALL: "Final Call",
  DEPARTED: "Departed",

  ESTIMATED: "Estimated",
  ARRIVED: "Arrived",
  EARLY: "Early",
  DELAYED: "Delayed",
  LANDED: "Landed",
  BAGGAGE: "Baggage Delivery",
  CANCELLED: "Cancelled",
};

export {
  AIRPORT,
  AIRLINES,
  DOMESTIC_ROUTES,
  INTERNATIONAL_ROUTES,
  AIRCRAFT_TYPES,
  GATES,
  STANDS,
  BELTS,
  CHECKIN_ROWS,
  AIRPORT_CONDITIONS,
  CURRENT_CONDITION,
  TIMING_RULES,
  DELAY_REASONS,
  FLIGHT_STATUS,
};
