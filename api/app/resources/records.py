from app.services.records_service import RecordService
from app.util.auth_tools import AuthenticatedResource, get_user_id
from flask_restful import fields, marshal


class RecordsResource(AuthenticatedResource):
    def post(self):
        record_service = RecordService()
        record_id = record_service.create_record()
        return record_id, 201

    def get(self):
        record_service = RecordService()
        records_fields = {
            'id': fields.Integer,
            'amount': fields.Fixed(decimals=2),
            'description': fields.String,
            'type': fields.String,
            'category_id': fields.Integer,
            'category': fields.String(attribute='category.name'),
            'creation_date': fields.DateTime('iso8601'),
            'removed': fields.Boolean,
        }

        records = record_service.get_records_by_filters(user_id=get_user_id(), removed=False)
        return marshal(records, records_fields), 200


class RecordResource(AuthenticatedResource):
    def put(self, record_id):
        record_service = RecordService()
        record_service.modify_record(record_id)
        return '', 200


class CurrentBill(AuthenticatedResource):
    def get(self):
        record_service = RecordService()
        return record_service.get_current_bill(user_id=get_user_id())
