from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.ext.declarative import declared_attr
import datetime as ddt
from contextlib import contextmanager

db = SQLAlchemy()
migrate = Migrate(db=db)


@contextmanager
def transaction():
    try:
        yield
        db.session.commit()
    except Exception:
        db.session.rollback()


db.transaction = transaction


class CreateModifyMixin:
    @declared_attr
    def creation_date(self):
        return db.Column(db.DateTime, default=ddt.datetime.now)

    @declared_attr
    def update_date(self):
        return db.Column(db.DateTime, onupdate=ddt.datetime.now)
