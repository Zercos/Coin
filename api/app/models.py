from app.db import db, CreateModifyMixin
from app.extensions import bcrypt
from flask import current_app


class User(db.Model, CreateModifyMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    first_name = db.Column(db.Unicode, nullable=False)
    last_name = db.Column(db.Unicode, nullable=False)
    email = db.Column(db.Unicode, nullable=False, unique=True)
    password_hash = db.Column(db.Unicode, nullable=False)

    def __init__(self, first_name, last_name, email, password):
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.password_hash = bcrypt.generate_password_hash(
            password, current_app.config.get('BCRYPT_LOG_ROUNDS')).decode()

    @property
    def full_name(self) -> str:
        return f'{self.first_name} {self.last_name}'
