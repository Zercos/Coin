import orjson
from flask import make_response
from flask_restful import Api

from .auth import AuthSessionsResource, RegisterResource, UserResource
from .info import AppInfo

from .categories import CategoriesResource, CategoryResource
from .records import RecordResource, RecordsResource, CurrentBill

api = Api(prefix='/v1')


def init_resources(app):
    api.add_resource(AppInfo, '/info')
    api.add_resource(RegisterResource, '/register')
    api.add_resource(AuthSessionsResource, '/login')
    api.add_resource(UserResource, '/user/<int:user_id>')
    api.add_resource(CategoriesResource, '/categories')
    api.add_resource(CategoryResource, '/category/<int:category_id>')
    api.add_resource(RecordsResource, '/records')
    api.add_resource(RecordResource, '/record/<int:record_id>')
    api.add_resource(CurrentBill, '/current-bill')

    api.init_app(app)
    return app


@api.representation('application/json')
def output_json(data, code, headers=None):
    resp = make_response(orjson.dumps(data), code)
    resp.headers.extend(headers or {})
    return resp
