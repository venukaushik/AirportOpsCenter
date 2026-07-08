/* ==========================================================
   WEATHER MODULE
========================================================== */

/* ==========================================================
   WEATHER CONDITIONS
========================================================== */

const WEATHER_TYPES = [
  {
    name: "Sunny",
    icon: "fa-sun",
    color: "#ffc400",
  },

  {
    name: "Partly Cloudy",
    icon: "fa-cloud-sun",
    color: "#f5c96a",
  },

  {
    name: "Cloudy",
    icon: "fa-cloud",
    color: "#cdd6df",
  },

  {
    name: "Rain",
    icon: "fa-cloud-rain",
    color: "#4db8ff",
  },

  {
    name: "Thunderstorm",
    icon: "fa-bolt",
    color: "#ffb347",
  },

  {
    name: "Fog",
    icon: "fa-smog",
    color: "#c7d0da",
  },
];

/* ==========================================================
   CURRENT WEATHER DATA
========================================================== */

let weather = {};

/* ==========================================================
   WEATHER PROFILES
========================================================== */

const WEATHER_PROFILES = {
  SUNNY: {
    condition: "Sunny",

    icon: "fa-sun",

    color: "#ffc400",

    temperature: [32, 40],

    humidity: [35, 55],

    wind: [5, 14],

    visibility: [8000, 10000],

    pressure: [1007, 1015],

    runway: "Dry",

    crosswind: "Low",

    lightning: "None",

    airportStatus: "Normal Operations",

    birdActivity: "Moderate",
  },

  PARTLY_CLOUDY: {
    condition: "Partly Cloudy",

    icon: "fa-cloud-sun",

    color: "#f5c96a",

    temperature: [30, 36],

    humidity: [45, 65],

    wind: [8, 18],

    visibility: [7000, 9000],

    pressure: [1005, 1013],

    runway: "Dry",

    crosswind: "Low",

    lightning: "None",

    airportStatus: "Normal Operations",

    birdActivity: "Moderate",

    advisories: [
      {
        level: "success",

        icon: "fa-cloud-sun",

        title: "Normal Weather",

        message: "Airport operations normal.",
      },
    ],
  },

  CLOUDY: {
    condition: "Cloudy",

    icon: "fa-cloud",

    color: "#cdd6df",

    temperature: [27, 34],

    humidity: [55, 75],

    wind: [8, 18],

    visibility: [6000, 9000],

    pressure: [1002, 1010],

    runway: "Dry",

    crosswind: "Low",

    lightning: "Low",

    airportStatus: "Normal Operations",

    birdActivity: "Moderate",

    advisories: [
      {
        level: "info",
        icon: "fa-cloud",
        title: "Stable Cloud Layer",
        message: "No operational impact.",
      },
    ],
  },

  RAIN: {
    condition: "Rain",

    icon: "fa-cloud-rain",

    color: "#4db8ff",

    temperature: [24, 30],

    humidity: [80, 96],

    wind: [15, 25],

    visibility: [2500, 6000],

    pressure: [996, 1005],

    runway: "Wet",

    crosswind: "Moderate",

    lightning: "Low",

    birdActivity: "Low",

    airportStatus: "Minor Delays",

    advisories: [
      {
        level: "warning",

        icon: "fa-cloud-rain",

        title: "Wet Runway",

        message: "Reduced braking action possible.",
      },

      {
        level: "info",

        icon: "fa-plane-arrival",

        title: "Arrival Flow Monitoring",

        message: "Minor delays expected.",
      },
    ],
  },

  THUNDERSTORM: {
    condition: "Thunderstorm",

    icon: "fa-bolt",

    color: "#ffb347",

    temperature: [24, 29],

    humidity: [88, 98],

    wind: [22, 38],

    visibility: [1000, 3500],

    pressure: [994, 1002],

    runway: "Wet",

    crosswind: "High",

    lightning: "High",

    birdActivity: "Low",

    airportStatus: "Delays Expected",

    advisories: [
      {
        level: "danger",

        icon: "fa-bolt",

        title: "Thunderstorm Warning",

        message: "Convective weather near airport.",
      },

      {
        level: "danger",

        icon: "fa-triangle-exclamation",

        title: "Ground Operations",

        message: "Lightning may suspend ramp activities.",
      },

      {
        level: "warning",

        icon: "fa-plane-departure",

        title: "Departure Delays",

        message: "Departure sequence may be impacted.",
      },
    ],
  },

  FOG: {
    condition: "Fog",

    icon: "fa-smog",

    color: "#c7d0da",

    temperature: [18, 24],

    humidity: [95, 100],

    wind: [2, 8],

    visibility: [200, 800],

    pressure: [1005, 1013],

    runway: "Damp",

    crosswind: "Low",

    lightning: "None",

    birdActivity: "High",

    airportStatus: "Low Visibility Procedures",

    advisories: [
      {
        level: "danger",

        icon: "fa-smog",

        title: "Low Visibility Procedures",

        message: "CAT II / CAT III operations active.",
      },

      {
        level: "warning",

        icon: "fa-plane",

        title: "Arrival Delays",

        message: "Reduced visibility affecting traffic.",
      },
    ],
  },
};

const forecast = [];

const advisories = [];

// Generate Forecast //

function generateForecast() {
  forecast.length = 0;

  const labels = ["Today", "Tomorrow", "Wed", "Thu", "Fri", "Sat", "Sun"];

  for (let i = 0; i < labels.length; i++) {
    const condition =
      WEATHER_TYPES[Math.floor(Math.random() * WEATHER_TYPES.length)];

    forecast.push({
      day: labels[i],

      icon: condition.icon,

      color: condition.color,

      condition: condition.name,

      high: randomInt(31, 39),

      low: randomInt(23, 30),

      rainChance: randomInt(0, 100),

      humidity: randomInt(45, 90),

      wind: randomInt(6, 28),

      visibility: randomInt(3000, 10000),
    });
  }
}

/* ==========================================================
   GENERATE ADVISORIES
========================================================== */

/* ==========================================================
   GENERATE ADVISORIES
========================================================== */

function generateAdvisories() {
  advisories.length = 0;

  weather.profile.advisories.forEach((advisory) => {
    advisories.push({
      ...advisory,

      time: "Now",
    });
  });
}

/* ==========================================================
   RENDER ADVISORIES
========================================================== */

function renderAdvisories() {
  const container = document.getElementById("weatherAlerts");

  if (!container) return;

  container.innerHTML = "";

  advisories.forEach((alert) => {
    const card = document.createElement("div");

    card.className = `advisory-card ${alert.level}`;

    card.innerHTML = `

            <div class="advisory-icon">

                <i class="fa-solid ${alert.icon}"></i>

            </div>

            <div class="advisory-content">

                <h4>${alert.title}</h4>

                <p>${alert.message}</p>

            </div>

            <span>${alert.time}</span>

        `;

    container.appendChild(card);
  });
}

/* ==========================================================
HELPERS
========================================================== */

/* ==========================================================
   GENERATE WEATHER
========================================================== */

function generateWeather() {
  const profile = WEATHER_PROFILES[randomProfile()];

  weather = {
    airport: "Delhi IGI Airport (VIDP)",

    condition: profile.condition,

    icon: profile.icon,

    color: profile.color,

    temperature: randomInt(...profile.temperature),

    humidity: randomInt(...profile.humidity),

    windSpeed: randomInt(...profile.wind),

    visibility: randomInt(...profile.visibility),

    pressure: randomInt(...profile.pressure),

    feelsLike: 0,

    dewPoint: 0,

    rainfall: 0,

    uvIndex: 0,

    windDirection: "",

    runwayCondition: profile.runway,

    crosswindRisk: profile.crosswind,

    lightningRisk: profile.lightning,

    airportStatus: profile.airportStatus,

    birdActivity: profile.birdActivity,
  };

  weather.feelsLike = weather.temperature + randomInt(0, 4);

  weather.dewPoint = weather.temperature - randomInt(3, 8);

  weather.rainfall =
    weather.condition === "Rain" || weather.condition === "Thunderstorm"
      ? randomInt(5, 60)
      : 0;

  weather.uvIndex =
    weather.condition === "Sunny" ? randomInt(8, 11) : randomInt(1, 6);

  weather.windDirection = randomInt(0, 359) + "°";

  weather.profile = profile;
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const PROFILE_KEYS = [
    "SUNNY",
    "PARTLY_CLOUDY",
    "CLOUDY",
    "RAIN",
    "THUNDERSTORM",
    "FOG"
];

function randomProfile() {

    return PROFILE_KEYS[randomInt(0, PROFILE_KEYS.length - 1)];

}

/* ==========================================================
CURRENT WEATHER
========================================================== */

function renderCurrentWeather() {
  setText("currentTemp", weather.temperature + "°C");

  setText("currentCondition", weather.condition);

  setText("airportName", weather.airport);

  setText("feelsLike", weather.feelsLike + "°C");

  setText("humidity", weather.humidity + "%");

  setText("windSpeed", weather.windSpeed + " km/h");

  setText("pressure", weather.pressure + " hPa");

  const weatherIcon = document.getElementById("currentWeatherIcon");

  if (weatherIcon) {
    weatherIcon.className = "fa-solid " + weather.icon;

    weatherIcon.style.color = weather.color;
  }
}

/* ==========================================================
   FORECAST
========================================================== */

function renderForecast() {
  const container = document.getElementById("forecastContainer");

  if (!container) return;

  container.innerHTML = "";

  forecast.forEach((day) => {
    const card = document.createElement("div");

    card.className = "forecast-card";

    card.innerHTML = `

<div class="forecast-icon">

    <i class="fa-solid ${day.icon}"
       style="color:${day.color}"></i>

</div>

<div class="forecast-day">

    ${day.day}

</div>

<div class="forecast-temp">

    ${day.high}°

</div>

<div class="forecast-condition">

    ${day.condition}

</div>

<div class="forecast-details">

    <div>

        <i class="fa-solid fa-droplet"></i>

        ${day.rainChance}%

    </div>

    <div>

        <i class="fa-solid fa-wind"></i>

        ${day.wind} km/h

    </div>

    <div>

        <i class="fa-solid fa-water"></i>

        ${day.humidity}%

    </div>

    <div>

        <i class="fa-solid fa-eye"></i>

        ${day.visibility} m

    </div>

</div>

`;

    container.appendChild(card);
  });
}

/* ==========================================================
   AIRPORT WEATHER STATUS
========================================================== */

function renderAirportStatus() {
  setText("visibility", weather.visibility + " m");
  setText("windDirection", weather.windDirection);
  setText("cloudCover", weather.cloudCover);
  setText("rainfall", weather.rainfall + " mm");
  setText("uvIndex", weather.uvIndex);
  setText("dewPoint", weather.dewPoint + "°C");

  /* Small labels */

  setText(
    "visibilityStatus",
    weather.visibility > 8000
      ? "Excellent"
      : weather.visibility > 4000
        ? "Moderate"
        : "Poor",
  );

  setText("windDirectionStatus", weather.windDirection);

  setText("cloudCoverStatus", weather.condition);

  setText("rainfallStatus", weather.rainfall === 0 ? "None" : "Active");

  setText(
    "uvIndexStatus",
    weather.uvIndex >= 8 ? "High" : weather.uvIndex >= 5 ? "Moderate" : "Low",
  );

  setText("dewPointStatus", weather.humidity > 80 ? "Humid" : "Comfortable");
}

/* ==========================================================
   OPERATIONAL IMPACT
========================================================== */

function renderOperationalImpact() {
  setText("runwayCondition", weather.runwayCondition);

  setText("crosswindRisk", weather.crosswindRisk);

  setText("lightningRisk", weather.lightningRisk);

  setText("birdActivity", weather.birdActivity);

  setText("airportStatus", weather.airportStatus);

  /* Secondary labels */

  setText(
    "runwayConditionStatus",
    weather.runwayCondition === "Dry" ? "Good" : "Caution",
  );

  setText("crosswindRiskStatus", weather.windSpeed + " km/h");

  setText(
    "lightningRiskStatus",
    weather.lightningRisk === "None" ? "No Activity" : "Monitor",
  );

  setText("birdActivityStatus", weather.birdActivity + " Risk");

  setText("airportStatusText", weather.airportStatus);
}

// Initialize the weather module //

generateWeather();

generateForecast();

generateAdvisories();

console.log(weather.profile);

renderCurrentWeather();

renderForecast();

renderAirportStatus();

renderOperationalImpact();

renderAdvisories();

console.table(weather);

console.log(forecast);

console.log(advisories);

console.log();
