/* ==========================================================
   GLOBAL LOADER
========================================================== */

export function showLoader(
    title = "Loading...",
    subtitle = "Please wait"
) {

    document
        .getElementById("loadingTitle")
        .textContent = title;

    document
        .getElementById("loadingSubtitle")
        .textContent = subtitle;

    document
        .getElementById("loadingOverlay")
        .classList.add("show");

}

export function hideLoader() {

    document
        .getElementById("loadingOverlay")
        .classList.remove("show");

}