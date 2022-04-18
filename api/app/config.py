import os


class Config:
    APP_NAME = 'CoinAPI'
    API_KEY = 'x-api-key'
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "secret_for_test_environment"
    BCRYPT_LOG_ROUNDS = 13
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL', 'postgresql://postgres:postgres@localhost/postgres')


class DevelopmentConfig(Config):
    FLASK_ENV = "development"
    DEVELOPMENT = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    BCRYPT_LOG_ROUNDS = 4


class TestingConfig(Config):
    ENV = 'testing'
    TESTING = True
    BCRYPT_LOG_ROUNDS = 4


class ProductionConfig(Config):
    DEBUG = False
    SECRET_KEY = os.environ.get('FLASK_SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    API_KEY = os.environ.get('FLASK_API_KEY')
