import time
from uuid import uuid4

import jwt
from flask import current_app


def create_auth_token(user_id: int):
    iat = time.time()
    payload = {
        'exp': iat + current_app.config['TTL_AUTH_TOKEN'],
        'iat': iat,
        'sub': user_id,
        'sid': str(uuid4()),
    }
    return jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
