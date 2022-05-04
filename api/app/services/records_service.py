import logging

from app.db import db
from app.models import Record, Category
from flask import abort
from flask_restful import reqparse
from app.util.auth_tools import get_user_id

log = logging.getLogger(__name__)


class RecordService:
    def create_record(self) -> str:
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('description', required=True, help='description cannot be blank')
        parser.add_argument('amount', required=True, help='Category limit cannot be blank', type=float)
        parser.add_argument('type', required=True, help='Type cannot be blank')
        parser.add_argument('category_id', required=True, help='Category cannot be blank', type=int)

        args = parser.parse_args(strict=True)
        category = Category.query.get(args['category_id'])
        if not category:
            log.info('Category with provided id %s is not exists', args['category_id'])
            abort(404, 'Category with provided id is not exists')
        elif category.user_id != get_user_id():
            log.info('Category %s is not owned by user %s', category.id, get_user_id())
            abort(403, 'Category is not owned by current user')
        with db.transaction():
            record = Record(user_id=get_user_id(), **args)
            db.session.add(record)
            db.session.commit()
        log.info('Record with desc=%s successfully created', args['description'])
        return category.id

    def modify_record(self, record_id):
        log.info('Modifying record %s', record_id)
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('description', required=True, help='description cannot be blank')
        parser.add_argument('amount', required=True, help='Category limit cannot be blank', type=float)
        parser.add_argument('type', required=True, help='Type cannot be blank')
        parser.add_argument('category_id', required=True, help='Category cannot be blank', type=int)

        args = parser.parse_args(strict=True)
        record = Record.query.get(record_id)
        if not record:
            log.info('Record with provided id %s not exists', record_id)
            abort(404, 'Record with provided id not exists')
        if record.user_id != get_user_id():
            log.info('Record %s is not owned by user %s', record_id, get_user_id())
            abort(403, 'Record is not owned by current user')
        log.debug('Modify record with args %r', args)
        with db.transaction():
            record.description = args['description']
            record.amount = args['amount']
            record.type = args['type']
            record.category_id = args['category_id']
            db.session.flush()
        log.info('Modified record %s', record_id)

    def get_records_by_filters(self, user_id=None, removed=None):
        log.info('Getting records by filter')
        q = Record.query
        if user_id is not None:
            q = q.filter_by(user_id=user_id)
        if removed is not None:
            q = q.filter_by(removed=removed)
        return q.all()
