from flask import Blueprint, jsonify
from datetime import datetime
import random

api_bp = Blueprint("api", __name__)


# ==========================================
# Dashboard
# ==========================================

@api_bp.route("/dashboard")
def dashboard():

    now = datetime.now()

    return jsonify({

        "flightCount": random.randint(295, 325),

        "departures": random.randint(140, 160),

        "arrivals": random.randint(150, 170),

        "status": random.choice([
            "NORMAL",
            "NORMAL",
            "NORMAL",
            "DELAYED"
        ]),

        "weather": random.choice([
            "Clear",
            "Cloudy",
            "Haze"
        ]),

        "temperature": random.randint(28, 36),

        "activeRunway": random.choice([
            "27L",
            "28",
            "29"
        ]),

        "currentTime": now.strftime("%H:%M:%S"),

        "currentDate": now.strftime("%A, %d %b %Y")

    })


# ==========================================
# Airport Information
# ==========================================

@api_bp.route("/airport")
def airport():

    now = datetime.now()

    return jsonify({

        "airport_name": "Indira Gandhi International Airport",

        "airport_code": "DEL",

        "city": "New Delhi",

        "country": "India",

        "local_time": now.strftime("%H:%M:%S"),

        "weather": random.choice([
            "Clear",
            "Cloudy",
            "Haze"
        ]),

        "temperature": random.randint(28, 36),

        "runway_status": random.choice([
            "Operational",
            "Operational",
            "Operational",
            "Maintenance"
        ]),

        "terminal_status": "Normal"

    })


# ==========================================
# Flights
# ==========================================

@api_bp.route("/flights")
def flights():

    return jsonify([

        {
            "flight_no": "AI302",
            "airline": "Air India",
            "origin": "Mumbai",
            "destination": "Delhi",
            "scheduled_time": "10:30",
            "actual_time": "10:35",
            "gate": "A12",
            "status": "Boarding"
        },

        {
            "flight_no": "6E214",
            "airline": "IndiGo",
            "origin": "Bengaluru",
            "destination": "Delhi",
            "scheduled_time": "11:15",
            "actual_time": None,
            "gate": "B08",
            "status": "Scheduled"
        },

        {
            "flight_no": "UK955",
            "airline": "Vistara",
            "origin": "Hyderabad",
            "destination": "Delhi",
            "scheduled_time": "11:45",
            "actual_time": "11:50",
            "gate": "C03",
            "status": "Delayed"
        },

        {
            "flight_no": "SG812",
            "airline": "SpiceJet",
            "origin": "Chennai",
            "destination": "Delhi",
            "scheduled_time": "12:20",
            "actual_time": None,
            "gate": "D07",
            "status": "Scheduled"
        }

    ])


# ==========================================
# Flight Status Chart
# ==========================================

@api_bp.route("/dashboard/flight-status")
def flight_status_chart():

    return jsonify({

        "labels": [
            "Scheduled",
            "Boarding",
            "Departed",
            "Delayed"
        ],

        "values": [
            random.randint(45, 60),
            random.randint(10, 20),
            random.randint(50, 70),
            random.randint(5, 15)
        ]

    })


# ==========================================
# Passenger Traffic Chart
# ==========================================

@api_bp.route("/dashboard/traffic")
def traffic_chart():

    return jsonify({

        "labels": [
            "06:00",
            "08:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00"
        ],

        "values": [

            random.randint(15, 25),

            random.randint(25, 40),

            random.randint(35, 50),

            random.randint(45, 60),

            random.randint(35, 55),

            random.randint(50, 70),

            random.randint(30, 50)

        ]

    })
