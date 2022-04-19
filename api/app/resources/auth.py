from flask_restful import Resource
from app.services.user_service import UserService


class MainResource(Resource):
    def get(self):
        return {'hello': 'world'}


class RegisterResource(Resource):
    def post(self):
        user_service = UserService()
        auth_token = user_service.create_user()
        return {'auth_token': auth_token}


class AuthSessionResource(Resource):
    def post(self):
        user_service = UserService()
        auth_token = user_service.user_login()
        return {'auth_token': auth_token}
