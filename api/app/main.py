import os

from flask import Flask

from app.resources import init_resources
from app.db import db, migrate
from app.extensions import bcrypt
from app import models  # noqa: F401


def create_app():
    app = Flask(__name__)
    config = os.environ.get('APP_CONFIG', 'app.config.DevelopmentConfig')
    app.config.from_object(config)
    app = init_resources(app)
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    return app
