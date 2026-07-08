import os


class Config:
    """Base configuration."""

    # Flask
    SECRET_KEY = os.environ.get("SECRET_KEY", "airport-secret")

    # Application
    DEBUG = True
    TESTING = False

    # Server
    HOST = "0.0.0.0"
    PORT = 5000

    # JSON
    JSON_SORT_KEYS = False

    # SocketIO
    SOCKETIO_ASYNC_MODE = "threading"

    # Refresh intervals (seconds)
    DASHBOARD_REFRESH = 10
    WEATHER_REFRESH = 60
    FLIGHT_REFRESH = 5

    # Future database configuration
    DATABASE_URI = os.environ.get(
        "DATABASE_URI",
        "sqlite:///airport.db"
    )
