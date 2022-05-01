import logging

from app.db import db
from app.models import User
from app.util.auth_tools import create_auth_token
from flask import abort
from flask_restful import reqparse
from app.extensions import bcrypt

log = logging.getLogger(__name__)


class UserService:
    def create_user(self) -> str:
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('email', required=True, help='Email cannot be blank')
        parser.add_argument('first_name', required=True, help='First name cannot be blank')
        parser.add_argument('last_name', required=True, help='Last name cannot be blank')
        parser.add_argument('password', required=True, help='Password cannot be blank')

        args = parser.parse_args(strict=True)
        existed_user = User.query.filter_by(email=args['email']).first()
        if existed_user:
            log.info('User with provided email=%s is already exists', args['email'])
            abort(409, 'User with this email already exists.')
        with db.transaction():
            user = User(**args)
            db.session.add(user)
            db.session.commit()
        log.info('User with email=%s %s successfully created', args['email'], user.full_name)
        return create_auth_token(user.id, args['email'], user.full_name)

    def user_login(self):
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('login', required=True, help='Email cannot be blank')
        parser.add_argument('password', required=True, help='Password cannot be blank')
        args = parser.parse_args(strict=True)

        user: User = User.query.filter_by(email=args['login']).first()
        if not user:
            log.info('User %s is not exists', args['login'])
            abort(404, 'User does not exist')
        if bcrypt.check_password_hash(user.password_hash, args['password']):
            return create_auth_token(user.id, user.email, user.full_name)
        else:
            abort(400, 'Password is invalid')

    def get_by_id(self, user_id: int):
        user = User.query.get(user_id)
        if not user:
            abort(404)
