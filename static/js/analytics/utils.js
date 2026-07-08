// ==========================================
// Analytics Utility Functions
// ==========================================


/**
 * Count occurrences of a property.
 *
 * Example:
 * countBy(flights, "airline")
 *
 * Returns:
 * {
 *   Indigo: 25,
 *   Air India: 18
 * * }
 */

export function countBy(array, property) {

    return array.reduce((result, item) => {

        const value = item[property];

        if (!value) return result;

        result[value] = (result[value] || 0) + 1;

        return result;

    }, {});

}


/**
 * Convert object into sorted array
 *
 * {
 *   A:5,
 *   B:2
 * }
 *
 * becomes
 *
 * [
 *   {label:"A", value:5},
 *   {label:"B", value:2}
 * ]
 */
export function objectToArray(object) {

    return Object.entries(object)
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value);

}


/**
 * Return Top N values
 */
export function getTopN(array, limit = 5) {

    return array.slice(0, limit);

}


/**
 * Calculate percentage
 */
export function calculatePercentage(value, total) {

    if (total === 0) return 0;

    return ((value / total) * 100);

}


/**
 * Format percentage
 */
export function formatPercentage(value) {

    return `${value.toFixed(1)}%`;

}


/**
 * Format numbers with commas
 */
export function formatNumber(number) {

    return Number(number).toLocaleString();

}


/**
 * Group flights by hour.
 *
 * Returns:
 * [
 *   4, 8, 12...
 * ]
 */
export function groupFlightsByHour(flights) {

    const hours = new Array(24).fill(0);

    flights.forEach(flight => {

        const time = flight.schedule || flight.scheduled;

        if (!time) return;

        const hour = parseInt(time.split(":")[0]);

        if (!isNaN(hour)) {

            hours[hour]++;

        }

    });

    return hours;

}


/**
 * Sort descending
 */
export function sortDescending(array, property = "value") {

    return [...array].sort((a, b) => b[property] - a[property]);

}


/**
 * Generate labels for 24-hour charts
 */
export function generateHourlyLabels() {

    return Array.from({ length: 24 }, (_, hour) => {

        return `${hour.toString().padStart(2, "0")}:00`;

    });

}


/**
 * Filter flights by type
 */
export function filterFlightsByType(flights, type) {

    return flights.filter(flight =>

        flight.flightType === type

    );

}


/**
 * Filter flights by status
 */
export function filterFlightsByStatus(flights, status) {

    return flights.filter(flight =>

        flight.status === status

    );

}


/**
 * Sum values of an object
 */
export function sumObjectValues(object) {

    return Object.values(object).reduce((sum, value) => sum + value, 0);

}