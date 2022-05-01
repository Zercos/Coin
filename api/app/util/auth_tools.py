import base64
import logging
import time
from functools import wraps
from typing import NamedTuple
from uuid import uuid4

import jwt
from flask import current_app, request, g
from flask_restful import Resource, abort

log = logging.getLogger(__name__)


def create_auth_token(user_id: int, login: str, user_name: str):
    iat = time.time()
    payload = {
        'exp': iat + current_app.config['TTL_AUTH_TOKEN'],
        'iat': iat,
        'sub': user_id,
        'jti': str(uuid4().hex),
        'utl': login,
        'ufn': user_name
    }
    return jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')


class AuthUser(NamedTuple):
    email: str
    session_id: str
    user_id: int


def validate_jwt(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token_header = request.headers.get('Authorization')
        if not token_header:
            abort(401)
        try:
            decoded_token = base64.b64decode(token_header.split()[1]).decode('utf-8')
            g.token_data = jwt.decode(decoded_token, current_app.config['SECRET_KEY'])
        except Exception:
            log.exception('Auth token decode error: %r', token_header)
            abort(401)
        token_exp = g.token_data.get('exp') or current_app.config['TTL_AUTH_TOKEN']
        token_ttl = time.time() - g.token_data.get('iat')
        if token_ttl >= token_exp:
            log.debug('Token was expired')
            abort(401)
        try:
            g.user_auth = AuthUser(g.token_data['utl'], g.token_data['jti'], g.token_data['sub'])
        except Exception:
            log.debug('Error during adding user auth data')
            abort(401)
        return func(*args, **kwargs)
    return wrapper


class AuthenticatedResource(Resource):
    method_decorators = [validate_jwt]
