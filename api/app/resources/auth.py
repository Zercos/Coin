from flask_restful import Resource, marshal, fields
from app.services.user_service import UserService
from app.util.auth_tools import AuthenticatedResource


class RegisterResource(Resource):
    def post(self):
        user_service = UserService()
        auth_token = user_service.create_user()
        return {'auth_token': auth_token}


class AuthSessionsResource(Resource):
    def post(self):
        user_service = UserService()
        auth_token = user_service.user_login()
        return {'auth_token': auth_token}


class UserResource(AuthenticatedResource):
    def get(self, user_id):
        user_service = UserService()
        marshal_fields = {
            'first_name': fields.String,
            'last_name': fields.String,
            'email': fields.String,
        }
        user = user_service.get_by_id(user_id)
        return marshal(user, marshal_fields), 200
