import psycopg2
from psycopg2 import OperationalError
from werkzeug.security import generate_password_hash, check_password_hash

DB_CONFIG = {  # connect info
    "dbname": "dreamsink",
    "user": "test",
    "password": "test",
    "host": "localhost",
    "port": "5432"
}

class User:
    def __init__(self, id, username, email, password_hash):
        self.id = id
        self.username = username
        self.email = email
        self.password_hash = password_hash

    def get_id(self):
        return str(self.id)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @staticmethod
    def get_connection():
        try:
            return psycopg2.connect(**DB_CONFIG)
        except OperationalError as e:
            print(f"Database connection error: {e}")
            return None

    @classmethod
    def get_user_by_email(cls, email):
        conn = cls.get_connection()
        if not conn:
            return None

        with conn:
            with conn.cursor() as cur:
                cur.execute('SELECT id, username, email, password_hash FROM users WHERE email = %s', (email,))
                user_data = cur.fetchone()

        return cls(*user_data) if user_data else None

    @classmethod
    def get_user_by_id(cls, user_id):
        conn = cls.get_connection()
        if not conn:
            return None

        with conn:
            with conn.cursor() as cur:
                cur.execute('SELECT id, username, email, password_hash FROM users WHERE id = %s', (user_id,))
                user_data = cur.fetchone()

        return cls(*user_data) if user_data else None