from flask import make_response
from flask_restful import Api
import orjson

from .auth import MainResource
from .info import AppInfo

api = Api(prefix='/v1')


def init_resources(app):
    api.add_resource(MainResource, '/')
    api.add_resource(AppInfo, '/info')

    api.init_app(app)
    return app


@api.representation('application/json')
def output_json(data, code, headers=None):
    resp = make_response(orjson.dumps(data), code)
    resp.headers.extend(headers or {})
    return resp
