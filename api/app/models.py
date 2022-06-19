from flask import current_app

from app.db import CreateModifyMixin, UserCreateModifyMixin, db
from app.extensions import bcrypt


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


class Category(db.Model, UserCreateModifyMixin):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.Unicode, nullable=False)
    limit = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Unicode)
    active = db.Column(db.Boolean, default=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))

    user = db.relationship(User, lazy=True)


class Record(db.Model, UserCreateModifyMixin):
    __tablename__ = 'records'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    amount = db.Column(db.Numeric, nullable=False)
    description = db.Column(db.Unicode, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    type = db.Column(db.Unicode, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(Category.id))
    removed = db.Column(db.Boolean, default=False)

    user = db.relationship(User, lazy=True)
    category = db.relationship(Category, lazy=True)
