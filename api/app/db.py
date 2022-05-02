from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import g
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
        raise


db.transaction = transaction


def get_user_id():
    auth_user = getattr(g, 'user_auth', None)
    return (auth_user and auth_user.user_id) or 1


class CreateModifyMixin:
    @declared_attr
    def creation_date(self):
        return db.Column(db.DateTime, default=ddt.datetime.now)

    @declared_attr
    def update_date(self):
        return db.Column(db.DateTime, onupdate=ddt.datetime.now)


class UserCreateModifyMixin(CreateModifyMixin):
    @declared_attr
    def created_by(self):
        return db.Column(db.Integer, nullable=False, default=get_user_id)

    @declared_attr
    def updated_by(self):
        return db.Column(db.Integer, onupdate=get_user_id)
