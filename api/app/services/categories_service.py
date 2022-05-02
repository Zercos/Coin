import logging

from app.db import db
from app.models import Category
from flask import abort
from flask_restful import reqparse
from app.util.auth_tools import get_user_id

log = logging.getLogger(__name__)


class CategoryService:
    def create_category(self) -> str:
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('name', required=True, help='Category name cannot be blank')
        parser.add_argument('limit', required=True, help='Category limit cannot be blank')
        parser.add_argument('description', required=False)

        args = parser.parse_args(strict=True)
        existed_category = Category.query.filter_by(name=args['name'], active=True).first()
        if existed_category:
            log.info('Active category with provided name=%s is already exists', args['name'])
            abort(409, 'Active category with this name already exists.')
        with db.transaction():
            category = Category(user_id=get_user_id(), **args)
            db.session.add(category)
            db.session.commit()
        log.info('Categor with name=%s successfully created', args['name'])
        return category.id

    def get_categories_by_filters(self, user_id=None, active=None):
        log.info('Getting categories by filter')
        q = Category.query
        if user_id is not None:
            q = q.filter_by(user_id=user_id)
        if active is not None:
            q = q.filter_by(active=active)
        return q.all()

    def modify_category(self, category_id):
        log.info('Modifying category %s', category_id)
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('name', required=True, help='Category name cannot be blank')
        parser.add_argument('limit', required=True, help='Category limit cannot be blank', type=int)
        parser.add_argument('description', required=True)
        parser.add_argument('active', required=True, type=bool)

        args = parser.parse_args(strict=True)
        category = Category.query.get(category_id)
        if not category:
            log.info('Category with provided id %s not exists', category_id)
            abort(404, 'Category with provided id not exists')
        if category.user_id != get_user_id():
            log.info('Category %s is not owned by user %s', category_id, get_user_id())
            abort(403, 'Category is not owned by current user')
        log.info('Modify with args %r', args)
        with db.transaction():
            category.name = args['name']
            category.limit = args['limit']
            category.description = args['description']
            category.active = args['active']
            db.session.flush()
        log.info('Modified category %s', category_id)
