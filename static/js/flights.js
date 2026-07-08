// ======================================================
// Airport Operations Control Center
// Flight Operations Engine
// Part 1 - Foundation
// ======================================================


// ======================================================
// MASTER DATA
// ======================================================

const airlines = [

    { name:"Air India", code:"AI" },
    { name:"IndiGo", code:"6E" },
    { name:"Akasa Air", code:"QP" },
    { name:"SpiceJet", code:"SG" },
    { name:"Vistara", code:"UK" },
    { name:"Emirates", code:"EK" },
    { name:"Qatar Airways", code:"QR" },
    { name:"Singapore Airlines", code:"SQ" },
    { name:"British Airways", code:"BA" },
    { name:"Lufthansa", code:"LH" }

];

const routes = [

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
    "Dubai",
    "Doha",
    "Singapore",
    "London",
    "Frankfurt",
    "Bangkok",
    "Kathmandu",
    "Colombo"

];

const aircraftTypes = [

    "A320neo",
    "A321neo",
    "A319",
    "A350-900",
    "B737 MAX",
    "B777-300ER",
    "B787-9"

];

const gates = [

    "A01","A02","A03","A04","A05",
    "B01","B02","B03","B04","B05",
    "C01","C02","C03","C04","C05"

];

const belts = [

    "Belt 01",
    "Belt 02",
    "Belt 03",
    "Belt 04",
    "Belt 05",
    "Belt 06"

];

// ======================================================
// TIMELINES
// ======================================================

const departureTimeline = [

    "Scheduled",
    "Check-in Open",
    "Security",
    "Boarding",
    "Final Call",
    "Departed",
    "Airborne"

];

const arrivalTimeline = [

    "Scheduled",
    "Final Approach",
    "Landing",
    "First Bag",
    "Last Bag",
    "Arrived"

];

// ======================================================
// APPLICATION STATE
// ======================================================

const flights = [];

let currentView = "all";

let currentSort = "";

let sortAscending = true;

// ======================================================
// HELPERS
// ======================================================

function randomItem(array){

    return array[
        Math.floor(Math.random()*array.length)
    ];

}

function pad(value){

    return String(value).padStart(2,"0");

}

// ======================================================
// TIME HELPERS
// ======================================================

function randomTime(){

    const hour =
        Math.floor(Math.random()*24);

    const minute =
        Math.floor(Math.random()*60);

    return `${pad(hour)}:${pad(minute)}`;

}

function estimatedTime(schedule){

    const parts = schedule.split(":");

    let hour = Number(parts[0]);

    let minute = Number(parts[1]);

    const offset =
        Math.floor(Math.random()*46)-15;

    minute += offset;

    while(minute<0){

        minute+=60;

        hour--;

    }

    while(minute>=60){

        minute-=60;

        hour++;

    }

    if(hour<0)
        hour+=24;

    if(hour>=24)
        hour-=24;

    return `${pad(hour)}:${pad(minute)}`;

}

function timeToMinutes(time){

    const parts = time.split(":");

    return Number(parts[0])*60 +
           Number(parts[1]);

}

function currentMinutes(){

    const now = new Date();

    return now.getHours()*60 +
           now.getMinutes();

}

// ======================================================
// FLIGHT GENERATOR
// ======================================================

function generateFlights(count=100){

    flights.length = 0;

    for(let i=0;i<count;i++){

        const airline =
            randomItem(airlines);

        const type =
            Math.random()>0.5
            ? "Arrival"
            : "Departure";

        const schedule =
            randomTime();

        flights.push({

            id:i+1,

            flight:
                airline.code +
                (100+Math.floor(Math.random()*900)),

            airline:
                airline.name,

            type,

            route:
                type==="Departure"
                ? `Delhi - ${randomItem(routes)}`
                : `${randomItem(routes)} - Delhi`,

            schedule,

            estimated:
                estimatedTime(schedule),

            gate:
                type==="Departure"
                ? randomItem(gates)
                : null,

            belt:
                type==="Arrival"
                ? randomItem(belts)
                : null,

            aircraft:
                randomItem(aircraftTypes),
				
			passengers:
				120 + Math.floor(Math.random()*81),

			crew:
				Math.random() > 0.15
				? "Ready"
				: "Pending",

			fuel:
				Math.random() > 0.20
				? "Completed"
				: "In Progress",

			baggage:
				type==="Arrival"
				? (Math.random()>0.5 ? "Unloading" : "Completed")
				: (Math.random()>0.5 ? "Loading" : "Completed"),

			terminal:
				["T1","T2","T3"][
				Math.floor(Math.random()*3)
			],

        });

    }

}

// ======================================================
// STATUS ENGINE
// ======================================================

function getFlightStatus(flight){

    const diff =
        timeToMinutes(flight.schedule) -
        currentMinutes();

    if(flight.type==="Departure"){

        if(diff>90)
            return {text:"Scheduled",class:"scheduled"};

        if(diff>45)
            return {text:"Check-in Open",class:"checkin"};

        if(diff>20)
            return {text:"Security",class:"security"};

        if(diff>5)
            return {text:"Boarding",class:"boarding"};

        if(diff>=0)
            return {text:"Final Call",class:"finalcall"};

        if(diff>-15)
            return {text:"Departed",class:"departed"};

        return {text:"Airborne",class:"airborne"};

    }

    if(diff>60)
        return {text:"Scheduled",class:"scheduled"};

    if(diff>15)
        return {text:"Final Approach",class:"approach"};

    if(diff>=-5)
        return {text:"Landing",class:"landing"};

    if(diff>-25)
        return {text:"First Bag",class:"firstbag"};

    if(diff>-45)
        return {text:"Last Bag",class:"lastbag"};

    return {text:"Arrived",class:"arrived"};

}

// ======================================================
// INITIALIZE DATA
// ======================================================

generateFlights(100);

// ======================================================
// FILTER ENGINE
// ======================================================

function applyFilters(data = flights){

    let filtered = [...data];

    // ==========================================
    // View Filter
    // ==========================================

    if(currentView === "arrival"){

        filtered = filtered.filter(
            flight => flight.type === "Arrival"
        );

    }

    else if(currentView === "departure"){

        filtered = filtered.filter(
            flight => flight.type === "Departure"
        );

    }

    // ==========================================
    // Search Filter
    // ==========================================

    const searchBox =
        document.getElementById("flightSearch");

    if(searchBox){

        const search =
            searchBox.value
            .trim()
            .toLowerCase();

        if(search){

            filtered = filtered.filter(flight =>

                flight.flight.toLowerCase().includes(search) ||

                flight.airline.toLowerCase().includes(search) ||

                flight.route.toLowerCase().includes(search) ||

                flight.aircraft.toLowerCase().includes(search) ||

                (flight.gate ?? "")
                    .toLowerCase()
                    .includes(search) ||

                (flight.belt ?? "")
                    .toLowerCase()
                    .includes(search)

            );

        }

    }

    // ==========================================
    // Airline Filter
    // ==========================================

    const airlineFilter =
        document.getElementById("airlineFilter");

    if(airlineFilter && airlineFilter.value){

        filtered = filtered.filter(

            flight =>
                flight.airline === airlineFilter.value

        );

    }

    return filtered;

}

// ======================================================
// SORT ENGINE
// ======================================================

function sortFlights(data){

    if(!currentSort)
        return data;

    return [...data].sort((a,b)=>{

        let valueA =
            a[currentSort] ?? "";

        let valueB =
            b[currentSort] ?? "";

        if(
            currentSort === "schedule" ||
            currentSort === "estimated"
        ){

            valueA =
                timeToMinutes(valueA);

            valueB =
                timeToMinutes(valueB);

        }

        else{

            valueA =
                valueA.toString().toLowerCase();

            valueB =
                valueB.toString().toLowerCase();

        }

        if(valueA < valueB)
            return sortAscending ? -1 : 1;

        if(valueA > valueB)
            return sortAscending ? 1 : -1;

        return 0;

    });

}

// ======================================================
// RENDER ENGINE
// ======================================================

function renderFlights(){

    const tbody =
        document.getElementById(
            "flightTableBody"
        );

    if(!tbody)
        return;

    tbody.innerHTML = "";

    let filtered =
        applyFilters(flights);

    filtered =
        sortFlights(filtered);

    filtered.forEach(flight=>{

        const status =
            getFlightStatus(flight);

        const row =
            document.createElement("tr");

        row.innerHTML = `

        <td>${flight.flight}</td>

        <td>${flight.airline}</td>

        <td class="type-column">
            ${flight.type}
        </td>

        <td>
            ${flight.route}
        </td>

        <td>
            ${flight.schedule}
        </td>

        <td>
            ${flight.estimated}
        </td>

        <td class="gate-column">
            ${flight.gate ?? "-"}
        </td>

        <td class="belt-column">
            ${flight.belt ?? "-"}
        </td>

        <td>
            ${flight.aircraft}
        </td>

        <td>

            <span class="status ${status.class}">

                ${status.text}

            </span>

        </td>

        `;
		row.style.cursor = "pointer";

		row.addEventListener("click",()=>{

		openFlightDrawer(flight);

});

        tbody.appendChild(row);

    });

    updateTableView();

}

// ======================================================
// DRAWER ENGINE
// ======================================================

// ======================================================
// OPEN FLIGHT DRAWER
// ======================================================

function openFlightDrawer(flight){

    const drawer =
        document.getElementById("flightDrawer");

    drawer.classList.add("open");

    document.getElementById("drawerFlight").textContent =
        flight.flight;

    document.getElementById("drawerAirline").textContent =
        flight.airline;

    document.getElementById("drawerType").textContent =
        flight.type;

    document.getElementById("drawerRoute").textContent =
        flight.route;

    document.getElementById("drawerAircraft").textContent =
        flight.aircraft;

    document.getElementById("drawerSchedule").textContent =
        flight.schedule;

    document.getElementById("drawerEstimated").textContent =
        flight.estimated;

    document.getElementById("drawerGate").textContent =
        flight.gate ?? "-";

    document.getElementById("drawerBelt").textContent =
        flight.belt ?? "-";

    document.getElementById("drawerPassengers").textContent =
        flight.passengers;

    document.getElementById("drawerTerminal").textContent =
        flight.terminal;

    document.getElementById("drawerStatus").textContent =
        getFlightStatus(flight).text;

    // ==========================================
    // Crew
    // ==========================================

    const crew =
        document.getElementById("drawerCrew");

    crew.textContent = flight.crew;

    crew.className =
        flight.crew === "Ready"
        ? "status-ready"
        : "status-pending";

    // ==========================================
    // Fuel
    // ==========================================

    const fuel =
        document.getElementById("drawerFuel");

    fuel.textContent = flight.fuel;

    fuel.className =
        flight.fuel === "Completed"
        ? "status-ready"
        : "status-progress";

    // ==========================================
    // Baggage
    // ==========================================

    const baggage =
        document.getElementById("drawerBaggage");

    baggage.textContent = flight.baggage;

    if(flight.baggage === "Completed"){

        baggage.className = "status-ready";

    }
    else{

        baggage.className = "status-progress";

    }

    // ==========================================
    // Delay
    // ==========================================

    const delay =
        document.getElementById("drawerDelay");

    const delayMinutes =
        timeToMinutes(flight.estimated) -
        timeToMinutes(flight.schedule);

    if(delayMinutes <= 0){

        delay.textContent = "On Time";

        delay.className = "status-ready";

    }
    else{

        delay.textContent =
            "+" + delayMinutes + " min";

        delay.className = "status-progress";

    }

    buildTimeline(flight);

}

// ======================================================
// TIMELINE ENGINE
// ======================================================

function buildTimeline(flight){

    const container =
        document.getElementById("flightTimeline");

    if(!container)
        return;

    const status =
        getFlightStatus(flight);

    const timeline =
        flight.type==="Departure"
        ? departureTimeline
        : arrivalTimeline;

    const currentStep =
        timeline.indexOf(status.text);

    container.innerHTML = "";

    timeline.forEach((step,index)=>{

        const div =
            document.createElement("div");

        div.className = "timeline-step";

        if(index < currentStep){

            div.classList.add("completed");

        }

        else if(index === currentStep){

            div.classList.add("active");

        }

        div.innerHTML = `

            <div class="timeline-dot"></div>

            <div class="timeline-content">

                <div class="timeline-title">

                    ${step}

                </div>

            </div>

        `;

        container.appendChild(div);

    });

}

// ======================================================
// CLOSE DRAWER
// ======================================================

const closeDrawer =
    document.getElementById("closeDrawer");

if(closeDrawer){

    closeDrawer.addEventListener("click",()=>{

        document
            .getElementById("flightDrawer")
            .classList.remove("open");

    });

}

// ======================================================
// TABLE VIEW ENGINE
// ======================================================

function updateTableView(){

    const typeHeader =
        document.getElementById("typeHeader");

    const gateHeader =
        document.getElementById("gateHeader");

    const beltHeader =
        document.getElementById("beltHeader");

    const routeHeader =
        document.getElementById("routeHeader");

    const scheduleHeader =
        document.getElementById("scheduleHeader");

    const estimatedHeader =
        document.getElementById("estimatedHeader");

    // Reset

    typeHeader.style.display = "";

    gateHeader.style.display = "";

    beltHeader.style.display = "";

    routeHeader
        .querySelector(".header-text")
        .textContent = "Route";

    scheduleHeader
        .querySelector(".header-text")
        .textContent = "Schedule";

    estimatedHeader
        .querySelector(".header-text")
        .textContent = "Estimated";

    document
        .querySelectorAll(".type-column")
        .forEach(c=>c.style.display="");

    document
        .querySelectorAll(".gate-column")
        .forEach(c=>c.style.display="");

    document
        .querySelectorAll(".belt-column")
        .forEach(c=>c.style.display="");

    if(currentView==="arrival"){

        typeHeader.style.display="none";

        gateHeader.style.display="none";

        routeHeader
            .querySelector(".header-text")
            .textContent="Origin";

        scheduleHeader
            .querySelector(".header-text")
            .textContent="STA";

        estimatedHeader
            .querySelector(".header-text")
            .textContent="ETA";

        document
            .querySelectorAll(".type-column")
            .forEach(c=>c.style.display="none");

        document
            .querySelectorAll(".gate-column")
            .forEach(c=>c.style.display="none");

    }

    else if(currentView==="departure"){

        typeHeader.style.display="none";

        beltHeader.style.display="none";

        routeHeader
            .querySelector(".header-text")
            .textContent="Destination";

        scheduleHeader
            .querySelector(".header-text")
            .textContent="STD";

        estimatedHeader
            .querySelector(".header-text")
            .textContent="ETD";

        document
            .querySelectorAll(".type-column")
            .forEach(c=>c.style.display="none");

        document
            .querySelectorAll(".belt-column")
            .forEach(c=>c.style.display="none");

    }

}

// ======================================================
// AIRLINE FILTER
// ======================================================

function populateAirlineFilter(){

    const airlineFilter =
        document.getElementById("airlineFilter");

    if(!airlineFilter)
        return;

    const uniqueAirlines =
        [...new Set(
            flights.map(f => f.airline)
        )].sort();

    airlineFilter.innerHTML =
        '<option value="">All Airlines</option>';

    uniqueAirlines.forEach(airline=>{

        airlineFilter.innerHTML +=

        `<option value="${airline}">

            ${airline}

        </option>`;

    });

}

// ======================================================
// SORT ICONS
// ======================================================

function updateSortIcons(){

    document
        .querySelectorAll(".sort-icon")
        .forEach(icon=>{

            icon.className =
                "fas fa-sort sort-icon";

        });

    if(!currentSort)
        return;

    const active =
        document.querySelector(
            `th[data-sort="${currentSort}"] .sort-icon`
        );

    if(!active)
        return;

    active.className =
        sortAscending
        ? "fas fa-sort-up sort-icon"
        : "fas fa-sort-down sort-icon";

}

// ======================================================
// SEARCH
// ======================================================

let searchTimer;

const searchBox =
    document.getElementById("flightSearch");

if(searchBox){

    searchBox.addEventListener("input",()=>{

        clearTimeout(searchTimer);

        searchTimer = setTimeout(()=>{

            renderFlights();

        },250);

    });

}

// ======================================================
// VIEW SELECTOR
// ======================================================

const viewSelect =
    document.getElementById("flightView");

if(viewSelect){

    viewSelect.addEventListener("change",function(){

        currentView = this.value;

        renderFlights();

    });

}

// ======================================================
// AIRLINE FILTER LISTENER
// ======================================================

const airlineFilter =
    document.getElementById("airlineFilter");

if(airlineFilter){

    airlineFilter.addEventListener("change",()=>{

        renderFlights();

    });

}

// ======================================================
// AIRLINE FILTER LISTENER
// ======================================================

const airlineFilter =
    document.getElementById("airlineFilter");

if(airlineFilter){

    airlineFilter.addEventListener("change",()=>{

        renderFlights();

    });

}

// ======================================================
// SORTING
// ======================================================

document
.querySelectorAll("th[data-sort]")
.forEach(header=>{

    header.style.cursor="pointer";

    header.addEventListener("click",()=>{

        const field =
            header.dataset.sort;

        if(currentSort===field){

            sortAscending =
                !sortAscending;

        }

        else{

            currentSort =
                field;

            sortAscending = true;

        }

        renderFlights();

        updateSortIcons();

    });

});

// ======================================================
// LIVE UPDATE
// ======================================================

setInterval(()=>{

    renderFlights();

},60000);

// ======================================================
// INITIALIZE
// ======================================================

populateAirlineFilter();

renderFlights();

updateSortIcons();


