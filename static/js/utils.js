// static/js/utils.js

/**
 * Format date and time
 */
function formatDateTime(dateString) {

    if (!dateString) {
        return "-";
    }

    const date = new Date(dateString);

    return date.toLocaleString();
}

/**
 * Format only time
 */
function formatTime(dateString) {

    if (!dateString) {
        return "-";
    }

    const date = new Date(dateString);

    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

/**
 * Format only date
 */
function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }

    const date = new Date(dateString);

    return date.toLocaleDateString();
}

/**
 * Show Bootstrap alert
 */
function showAlert(message, type = "success") {

    const alertContainer = document.getElementById("alert-container");

    if (!alertContainer) return;

    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert">
            </button>
        </div>
    `;

    setTimeout(() => {
        alertContainer.innerHTML = "";
    }, 5000);
}

/**
 * Show loading spinner
 */
function showLoader(loaderId = "loader") {

    const loader = document.getElementById(loaderId);

    if (loader) {
        loader.style.display = "block";
    }
}

/**
 * Hide loading spinner
 */
function hideLoader(loaderId = "loader") {

    const loader = document.getElementById(loaderId);

    if (loader) {
        loader.style.display = "none";
    }
}

/**
 * Capitalize first letter
 */
function capitalize(text) {

    if (!text) {
        return "";
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Generate random color
 */
function randomColor() {

    const letters = "0123456789ABCDEF";

    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

/**
 * Fetch JSON helper
 */
async function fetchJSON(url) {

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return await response.json();
}

/**
 * POST JSON helper
 */
async function postJSON(url, data) {

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return await response.json();
}

/**
 * Confirm dialog
 */
function confirmAction(message) {
    return confirm(message);
}

/**
 * Refresh page
 */
function refreshPage() {
    location.reload();
}
