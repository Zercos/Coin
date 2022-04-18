from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.ext.declarative import declared_attr
import datetime as ddt

db = SQLAlchemy()
migrate = Migrate(db=db)


class CreateModifyMixin:
    @declared_attr
    def creation_date(self):
        return db.Column(db.DateTime, default=ddt.datetime.now)

    @declared_attr
    def update_date(self):
        return db.Column(db.DateTime, onupdate=ddt.datetime.now)