/* ============================================================
   FLIGHTS MODULE - UTILITIES
   utils.js
   ============================================================ */


/* ============================================================
   RANDOM HELPERS
   ============================================================ */

export function randomInt(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}


export function randomItem(array) {

    return array[randomInt(0, array.length - 1)];

}


export function randomBoolean(chance = 50) {

    return Math.random() * 100 < chance;

}


/* ============================================================
   FLIGHT NUMBER
   ============================================================ */

export function generateFlightNumber(airlineCode) {

    const number = randomInt(101, 9999);

    return airlineCode + number;

}


/* ============================================================
   TIME HELPERS
   ============================================================ */

export function addMinutes(date, minutes) {

    return new Date(date.getTime() + minutes * 60000);

}


export function subtractMinutes(date, minutes) {

    return new Date(date.getTime() - minutes * 60000);

}


export function cloneDate(date) {

    return new Date(date.getTime());

}


export function formatTime(date) {

    return date.toLocaleTimeString("en-GB", {

        hour: "2-digit",
        minute: "2-digit",
        hour12: false

    });

}


export function formatDate(date) {

    return date.toLocaleDateString("en-GB");

}


/* ============================================================
   DATE COMPARISON
   ============================================================ */

export function minutesBetween(first, second) {

    return Math.round((second - first) / 60000);

}


/* ============================================================
   TRAFFIC WAVE TIME
   ============================================================ */

export function randomTimeToday() {

    const now = new Date();

    const waves = [

        {
            start: 5,
            end: 10,
            weight: 30
        },

        {
            start: 10,
            end: 15,
            weight: 20
        },

        {
            start: 16,
            end: 22,
            weight: 35
        },

        {
            start: 22,
            end: 24,
            weight: 10
        },

        {
            start: 0,
            end: 5,
            weight: 5
        }

    ];

    const wave = weightedChoice([

        { value: waves[0], weight: waves[0].weight },
        { value: waves[1], weight: waves[1].weight },
        { value: waves[2], weight: waves[2].weight },
        { value: waves[3], weight: waves[3].weight },
        { value: waves[4], weight: waves[4].weight }

    ]);

    const hour = randomInt(wave.start, wave.end - 1);

    const minute = randomInt(0, 59);

    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hour,
        minute,
        0,
        0
    );

}


/* ============================================================
   UNIQUE FLIGHT ID
   ============================================================ */

export function generateFlightId() {

    return "FLT-" + Date.now() + "-" + randomInt(1000, 9999);

}


/* ============================================================
   WEIGHTED RANDOM CHOICE
   ============================================================ */

export function weightedChoice(options) {

    const total = options.reduce((sum, option) => sum + option.weight, 0);

    let random = Math.random() * total;

    for (const option of options) {

        if (random < option.weight) {
            return option.value;
        }

        random -= option.weight;

    }

}


/* ============================================================
   RANDOM DELAY
   ============================================================ */

export function randomDelay(min, max) {

    return randomInt(min, max);

}


/* ============================================================
   PAD NUMBER
   ============================================================ */

export function pad(value) {

    return String(value).padStart(2, "0");

}


/* ============================================================
   TIME STRING
   ============================================================ */

export function formatTimeHHMM(date) {

    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;

}