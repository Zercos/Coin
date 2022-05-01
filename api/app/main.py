import logging
import os

from flask import Flask

from app import models  # noqa: F401
from app.db import db, migrate
from app.extensions import bcrypt, flask_cors
from app.resources.api import init_resources

logging.basicConfig(level=logging.DEBUG)


def create_app():
    app = Flask(__name__)
    config = os.environ.get('APP_CONFIG', 'app.config.DevelopmentConfig')
    app.config.from_object(config)
    app = init_resources(app)
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    flask_cors.init_app(app)

    return app
