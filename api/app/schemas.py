import logging

from flask import request
from flask_restful import abort
from marshmallow import EXCLUDE, ValidationError, fields

from app.extensions import ma

log = logging.getLogger(__name__)
default_error_messages = {'null': 'Field may not be null.',
                          'required': 'Missing data for required field.',
                          'validator_failed': 'Invalid value.'}


def parse_args(schema: ma.Schema) -> dict:
    try:
        parsed_data = schema().load(request.json, unknown=EXCLUDE)
        return parsed_data
    except ValidationError as err:
        log.debug('Error parsing args for schema %s, errors: %s', schema, err.messages)
        abort(400, errors=err.messages)


class NewUserSchema(ma.Schema):
    email = fields.Str(required=True, allow_none=False)
    first_name = fields.Str(required=True, allow_none=False)
    last_name = fields.Str(required=True, allow_none=False)
    password = fields.Str(required=True, allow_none=False)


class NewCategorySchema(ma.Schema):
    name = fields.Str(required=True, allow_none=False)
    limit = fields.Decimal(required=True, allow_none=False)
    description = fields.Str()


class EditCategorySchema(ma.Schema):
    name = fields.Str(required=True, allow_none=False)
    limit = fields.Decimal(required=True, allow_none=False)
    description = fields.Str(required=True)
    active = fields.Bool(required=True)


class NewRecordSchema(ma.Schema):
    description = fields.Str(required=True, allow_none=False)
    amount = fields.Decimal(required=True, allow_none=False)
    type = fields.Str(required=True, allow_none=False)
    category_id = fields.Int(required=True, allow_none=False)


class EditRecordSchema(ma.Schema):
    description = fields.Str(required=True, allow_none=False)
    amount = fields.Decimal(required=True, allow_none=False)
    type = fields.Str(required=True, allow_none=False)
    category_id = fields.Int(required=True, allow_none=False)
