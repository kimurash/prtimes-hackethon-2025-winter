from flask_login import UserMixin
import psycopg2
from werkzeug.security import generate_password_hash, check_password_hash

class User(UserMixin):
    def __init__(self, id, email, password_hash):
        self.id = id
        self.email = email
        self.password_hash = password_hash

    @classmethod
    def get_user_by_email(cls, email):
        conn = psycopg2.connect("dbname=dreamsink user=test password=test host=localhost port=5432")
        cur = conn.cursor()
        cur.execute('SELECT * FROM users WHERE email = %s', (email,))
        user_data = cur.fetchone()
        conn.close()
        print(user_data)  # デバッグ用に確認
        if user_data:
            return cls(id=user_data[0], email=user_data[1], password_hash=user_data[2])
        return None

    @classmethod
    def get_user_by_id(cls, user_id):
        conn = psycopg2.connect("dbname=dreamsink user=test password=test host=localhost port=5432")
        cur = conn.cursor()
        cur.execute('SELECT * FROM users WHERE id = %s', (user_id,))
        user_data = cur.fetchone()
        conn.close()

        if user_data:
            return cls(id=user_data[0], email=user_data[1], password_hash=user_data[2])
        return None

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @classmethod
    def create_user(cls, email, password):
        password_hash = generate_password_hash(password)
        conn = psycopg2.connect("dbname=dreamsink user=test password=test host=localhost port=5432")
        cur = conn.cursor()
        cur.execute('INSERT INTO users (email, password_hash) VALUES (%s, %s)', (email, password_hash))
        conn.commit()
        conn.close()
