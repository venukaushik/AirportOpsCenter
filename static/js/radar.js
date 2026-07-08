// ======================================
// Airport Surveillance Radar Engine
// Part 1
// ======================================

const RADAR_SIZE = 650;
const SPAWN_OFFSET = 70;

// ======================================
// Passenger Flights
// ======================================

const passengerFlights = [

    "AI302",
    "AI431",
    "AI915",

    "6E214",
    "6E512",
    "6E873",

    "UK955",
    "UK811",

    "EK511",
    "EK234",

    "SQ406",
    "SQ424",

    "QR571",

    "BA142",

    "LH761",

    "CX692"

];

// ======================================
// Military Flights
// ======================================

const militaryFlights = [

    "IAF021",
    "IAF115",
    "IAF208",
    "IAF302"

];

// ======================================
// Flight Levels
// ======================================

const flightLevels = [

    "FL080",
    "FL120",
    "FL180",
    "FL220",
    "FL260",
    "FL300",
    "FL340",
    "FL360"

];

// ======================================
// Aircraft Speed Profiles
// ======================================

const aircraftSpeeds = {

    passenger: {

        min:0.0010,
        max:0.0018

    },

    military:{

        min:0.0018,
        max:0.0026

    }

};

const corridors = [

    // Left → Right

    { id:1, sx:-70, sy:80, ex:720, ey:120 },

    { id:2, sx:-70, sy:170, ex:720, ey:200 },

    { id:3, sx:-70, sy:300, ex:720, ey:320 },

    { id:4, sx:-70, sy:430, ex:720, ey:410 },

    { id:5, sx:-70, sy:560, ex:720, ey:520 },

    // Right → Left

    { id:6, sx:720, sy:90, ex:-70, ey:130 },

    { id:7, sx:720, sy:230, ex:-70, ey:250 },

    { id:8, sx:720, sy:360, ex:-70, ey:340 },

    { id:9, sx:720, sy:520, ex:-70, ey:500 },

    // Top → Bottom

    { id:10, sx:100, sy:-70, ex:130, ey:720 },

    { id:11, sx:260, sy:-70, ex:280, ey:720 },

    { id:12, sx:420, sy:-70, ex:400, ey:720 },

    { id:13, sx:560, sy:-70, ex:540, ey:720 },

    // Bottom → Top

    { id:14, sx:120, sy:720, ex:90, ey:-70 },

    { id:15, sx:310, sy:720, ex:330, ey:-70 },

    { id:16, sx:520, sy:720, ex:500, ey:-70 },

    // Diagonals

    { id:17, sx:-70, sy:650, ex:720, ey:-50 },

    { id:18, sx:720, sy:650, ex:-70, ey:-50 },

    { id:19, sx:-70, sy:-50, ex:720, ey:650 },

    { id:20, sx:720, sy:-50, ex:-70, ey:650 }

];

const usedCorridors = new Set();

function getFreeCorridor(){

    const available =
        corridors.filter(c => !usedCorridors.has(c.id));

    if(available.length === 0){

        usedCorridors.clear();

        return getFreeCorridor();

    }

    const corridor =
        available[Math.floor(Math.random()*available.length)];

    usedCorridors.add(corridor.id);

    return corridor;

}

function releaseCorridor(id){

    usedCorridors.delete(id);

}

const aircraft = [

    { id:"plane1", type:"passenger" },
    { id:"plane2", type:"passenger" },
    { id:"plane3", type:"passenger" },
    { id:"plane4", type:"passenger" },
    { id:"plane5", type:"passenger" },
    { id:"plane6", type:"passenger" },
    { id:"plane7", type:"passenger" },
    { id:"plane8", type:"military" }

];

function randomFlight(type){

    if(type==="military"){

        return militaryFlights[
            Math.floor(Math.random()*militaryFlights.length)
        ];

    }

    return passengerFlights[
        Math.floor(Math.random()*passengerFlights.length)
    ];

}

// ======================================
// Spawn Aircraft
// ======================================


function spawnAircraft(plane){

    const corridor = getFreeCorridor();

    plane.corridorId = corridor.id;

    plane.startX = corridor.sx;
    plane.startY = corridor.sy;

    plane.endX = corridor.ex;
    plane.endY = corridor.ey;

    plane.progress = 0;

    plane.visible = true;

    plane.flight = randomFlight(plane.type);

    plane.level =
        flightLevels[
            Math.floor(Math.random()*flightLevels.length)
        ];

    const profile =
        aircraftSpeeds[plane.type];

    plane.speed =
        profile.min +
        Math.random() *
        (profile.max-profile.min);
	plane.trail = [];
	updateTrackedAircraft();
}

// ======================================
// Initial Spawn
// ======================================

aircraft.forEach(spawnAircraft);

// ======================================
// Update Aircraft Position
// ======================================

function updateAircraft(plane){

    if(!plane.visible)
        return;

    plane.progress += plane.speed;

    if(plane.progress >= 1){

    plane.visible = false;

    releaseCorridor(plane.corridorId);

    plane.respawnAt =
        Date.now() + 2000 + Math.random()*2000;

    updateTrackedAircraft();

    return;

}

    plane.x =
        plane.startX +
        (plane.endX-plane.startX) * plane.progress;

    plane.y =
        plane.startY +
        (plane.endY-plane.startY) * plane.progress;

	plane.trail.push({
    x: plane.x,
    y: plane.y
});

if (plane.trail.length > 15) {
    plane.trail.shift();
}
}

// ======================================
// Respawn Aircraft
// ======================================

function respawnAircraft(plane){

    if(plane.visible)
        return;

    if(Date.now() < plane.respawnAt)
        return;

    spawnAircraft(plane);

}

function drawTrail(plane){

    const svg = document.getElementById("radarTrails");

    if(!svg) return;

    let line = document.getElementById("trail-" + plane.id);

    if(!line){

        line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polyline"
        );

        line.id = "trail-" + plane.id;

        svg.appendChild(line);

    }

    const points = plane.trail
        .map(p => `${p.x},${p.y}`)
        .join(" ");

    line.setAttribute("points", points);

}

// ======================================
// Draw Aircraft
// ======================================

function drawAircraft(plane){

    const element =
        document.getElementById(plane.id);

    if(!element)
        return;

    if(!plane.visible){

        element.style.display = "none";
	    const trail = document.getElementById("trail-" + plane.id);

if(trail){

    trail.remove();

}

        return;

    }

    element.style.display = "flex";

    element.style.left = plane.x + "px";

    element.style.top = plane.y + "px";

    element.querySelector("span").innerHTML =
`
${plane.flight}<br>
<small>${plane.level}</small>
`;

}

// ======================================
// Rotate Aircraft
// ======================================

function rotateAircraft(plane){

    const angle =
    Math.atan2(
        plane.endY-plane.startY,
        plane.endX-plane.startX
    )*180/Math.PI;

    document
        .getElementById(plane.id)
        .querySelector(".aircraft-icon")
        .style.transform =
            `rotate(${angle+90}deg)`;

}

function detectAircraft(plane){

    const dx = plane.x - RADAR_SIZE/2;
    const dy = plane.y - RADAR_SIZE/2;

    let aircraftAngle =
        Math.atan2(dy,dx)*180/Math.PI;

    aircraftAngle += 90;

    if(aircraftAngle < 0)
        aircraftAngle += 360;

    const difference =
        Math.abs(sweepAngle-aircraftAngle);

    const element =
        document.getElementById(plane.id);

    if(!element)
        return;

    if(difference < 8){

        element.style.opacity="1";

        element.style.filter=
            "drop-shadow(0 0 12px #00ff80)";

    }

    else{

        element.style.opacity=".45";

        element.style.filter="none";

    }

}

let sweepAngle = 0;

// ======================================
// Animation Loop
// ======================================

function animateRadar(){

	sweepAngle += 1;

	if(sweepAngle >= 360){

		sweepAngle = 0;

	}

    aircraft.forEach(plane=>{

        updateAircraft(plane);

        respawnAircraft(plane);

        drawTrail(plane);
	    
	drawAircraft(plane);

        if(plane.visible){

            rotateAircraft(plane);
			detectAircraft(plane);
        }

    });

    

    requestAnimationFrame(animateRadar);

}

animateRadar();


// ======================================================
// LIVE TRACKED AIRCRAFT
// ======================================================

function updateTrackedAircraft(){

    const container =
        document.getElementById("trackedAircraftList");

    if(!container) return;

    container.innerHTML = "";

    aircraft.forEach(plane=>{

        if(!plane.visible) return;

        const card = document.createElement("div");

        card.className = "live-aircraft";

        card.dataset.id = plane.id;

        card.innerHTML = `

            <div>

                <strong>${plane.flight}</strong><br>

                <small>${plane.level}</small>

            </div>

            <div>

                ${plane.type==="military" ? "🛡️" : "✈"}

            </div>

        `;

        card.addEventListener("click", () => {

    console.log("Clicked:", plane.flight);

    showAircraftDetails(plane);

});

        container.appendChild(card);

    });

}

// ======================================================
// AIRCRAFT DETAILS
// ======================================================

function showAircraftDetails(plane){
	console.log(plane);
    const panel =
        document.getElementById("aircraftDetails");

    if(!panel) return;

    const heading = Math.round(
        Math.atan2(
            plane.endY-plane.startY,
            plane.endX-plane.startX
        ) * 180 / Math.PI
    );

    panel.innerHTML = `

        <div class="details-card">

            <h3>${plane.flight}</h3>

            <table>

                <tr>

                    <td>Type</td>

                    <td>${plane.type}</td>

                </tr>

                <tr>

                    <td>Altitude</td>

                    <td>${plane.level}</td>

                </tr>

                <tr>

                    <td>Heading</td>

                    <td>${heading}&deg;</td>

                </tr>

                <tr>

                    <td>Speed</td>

                    <td>${Math.round(plane.speed*250000)} KT</td>

                </tr>

                <tr>

                    <td>Status</td>

                    <td style="color:#43ff86">

                        Tracking

                    </td>

                </tr>

            </table>

        </div>

    `;

}

function drawAirport() {

    // Center of radar
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // -------------------------
    // Runway
    // -------------------------

    ctx.fillStyle = "#4a4a4a";

    ctx.fillRect(
        cx - 220,
        cy - 12,
        440,
        24
    );

    // Runway center line

    ctx.strokeStyle = "#ffffff";

    ctx.lineWidth = 2;

    ctx.setLineDash([18, 12]);

    ctx.beginPath();

    ctx.moveTo(cx - 210, cy);

    ctx.lineTo(cx + 210, cy);

    ctx.stroke();

    ctx.setLineDash([]);

    // Runway Labels

    ctx.fillStyle = "#ffffff";

    ctx.font = "14px Arial";

    ctx.fillText("29L", cx - 235, cy - 18);

    ctx.fillText("11R", cx + 205, cy - 18);

    // -------------------------
    // Taxiway
    // -------------------------

    ctx.fillStyle = "#c99c2b";

    ctx.fillRect(
        cx - 220,
        cy + 55,
        440,
        10
    );

    ctx.fillStyle = "#f4d03f";

    ctx.font = "13px Arial";

    ctx.fillText("Taxiway A", cx - 40, cy + 48);

    // -------------------------
    // Terminal Apron
    // -------------------------

    ctx.fillStyle = "#2c3e50";

    ctx.fillRect(
        cx - 170,
        cy + 90,
        340,
        80
    );

    // -------------------------
    // Gates
    // -------------------------

    ctx.fillStyle = "#00e5ff";

    for (let i = 0; i < 6; i++) {

        const x = cx - 150 + i * 60;

        ctx.fillRect(
            x,
            cy + 80,
            3,
            20
        );

        ctx.font = "11px Arial";

        ctx.fillText(
            "G" + (i + 1),
            x - 8,
            cy + 115
        );

    }

}
