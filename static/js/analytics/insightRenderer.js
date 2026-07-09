/* ============================================================
   ANALYTICS MODULE
   insightRenderer.js
   ============================================================ */

import { analyticsStore } from "./store.js";

/* ============================================================
   RENDER INSIGHTS
   ============================================================ */

export function renderInsights() {

    const container = document.getElementById("analyticsInsights");

    if (!container) return;

    container.innerHTML = "";

    analyticsStore.insights.forEach((insight) => {

        const card = document.createElement("div");

        card.className = "insight-card";

        card.innerHTML = `
            <div class="insight-header">

                <div class="insight-title">
                    ${insight.title}
                </div>

            </div>

            <div class="insight-value">
                ${insight.value}
            </div>

            <div class="insight-description">
                ${insight.description}
            </div>
        `;

        container.appendChild(card);

    });

}