from app.services.categories_service import CategoryService
from app.util.auth_tools import AuthenticatedResource, get_user_id
from flask_restful import fields, marshal


class CategoriesResource(AuthenticatedResource):
    def post(self):
        category_service = CategoryService()
        category_id = category_service.create_category()
        return category_id, 201

    def get(self):
        category_service = CategoryService()
        category_field = {
            'name': fields.String,
            'description': fields.String,
            'limit': fields.Integer,
            'active': fields.Boolean,
            'creation_date': fields.DateTime('iso8601')
        }

        categories = category_service.get_categories_by_filters(user_id=get_user_id(), active=True)
        return marshal(categories, category_field), 200
