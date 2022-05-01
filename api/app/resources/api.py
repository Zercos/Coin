from flask import make_response
from flask_restful import Api
import orjson

from .auth import RegisterResource, AuthSessionsResource, UserResource
from .info import AppInfo

api = Api(prefix='/v1')


def init_resources(app):
    api.add_resource(AppInfo, '/info')
    api.add_resource(RegisterResource, '/register')
    api.add_resource(AuthSessionsResource, '/login')
    api.add_resource(UserResource, '/user/<int:user_id>')

    api.init_app(app)
    return app


@api.representation('application/json')
def output_json(data, code, headers=None):
    resp = make_response(orjson.dumps(data), code)
    resp.headers.extend(headers or {})
    return resp
