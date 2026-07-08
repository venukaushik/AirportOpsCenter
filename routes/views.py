from flask import Blueprint, render_template

views_bp = Blueprint("views", __name__)


@views_bp.route("/")
def overview():
    return render_template("overview.html")


@views_bp.route("/flight")
def flights():
    return render_template("flights.html")


@views_bp.route("/airside")
def airside():
    return render_template("airside.html")


@views_bp.route("/gates")
def gates():
    return render_template("gates.html")


@views_bp.route("/ground")
def ground():
    return render_template("vehicles.html")


@views_bp.route("/baggage")
def baggage():
    return render_template("baggage.html")


@views_bp.route("/weather")
def weather():
    return render_template("weather.html")


@views_bp.route("/alerts")
def alerts():
    return render_template("alerts.html")


@views_bp.route("/analytics")
def analytics():
    return render_template("analytics.html")

@views_bp.route("/radar")
def radar():

    return render_template("radar.html")
