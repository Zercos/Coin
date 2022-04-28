from app.db import db
from flask import current_app
from flask_restful import Resource


class AppInfo(Resource):
    def get(self):
        version = db.session.execute('SELECT version()').fetchone()[0]
        return {'name': current_app.config.get('APP_NAME'), 'pg_version': version}
