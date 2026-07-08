from flask import Flask
from flask_socketio import SocketIO

from config import Config

# Blueprints
from routes.views import views_bp
from routes.api import api_bp

app = Flask(__name__)
app.config.from_object(Config)

socketio = SocketIO(
    app,
    cors_allowed_origins="*"
)

# Register Blueprints
app.register_blueprint(views_bp)
app.register_blueprint(api_bp, url_prefix="/api")


if __name__ == "__main__":
    socketio.run(
        app,
        host=app.config["HOST"],
        port=app.config["PORT"],
        debug=app.config["DEBUG"]
    )
