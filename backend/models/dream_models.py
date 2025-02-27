import psycopg2
from flask_login import current_user

DB_CONFIG = {  # connect info
    "dbname": "dreamsink",
    "user": "test",
    "password": "test",
    "host": "localhost",
    "port": "5432",
    "options": "-c client_encoding=UTF8"
}

class Dream:
    def __init__(self, id, user_id, title, content, is_public,likes):
        self.id = id
        self.user_id = user_id
        self.title = title
        self.content = content
        self.is_public = is_public
        self.likes = likes

    @classmethod  # ユーザーのメモ一覧を取得
    def get_all_by_user(cls, user_id):
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            cur = conn.cursor()
            # user_idに該当するメモデータを取得
            cur.execute("SELECT id, user_id, title, content, is_public FROM dreams WHERE user_id = %s", (user_id,))
            dreams = [cls(*row) for row in cur.fetchall()]
            cur.close()
            conn.close()
            return dreams
        except Exception as e:
            print(f"Error occurred while fetching user dreams: {e}")
            return None

    @classmethod  # メモのidに基づいて、特定のメモを取得
    def get_by_id(cls, id):
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            cur = conn.cursor()
            cur.execute("SELECT id, user_id, title, content, is_public, likes FROM dreams WHERE id = %s", (id,))
            result = cur.fetchone()
            if result:
                cur.close()
                conn.close()
                return cls(*result)
            else:
                cur.close()
                conn.close()
                print(f"Error occurred getting dream with id {id}")
                return None  # メモが見つからなかった場合
        except Exception as e:
            print(f"Error occurred while fetching dream by id: {e}")
            return None

    @classmethod # 新しいメモの作成
    def create(cls, user_id, title, content, is_public=False):
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO dreams (user_id, title, content, is_public) VALUES (%s, %s, %s, %s) RETURNING id",
                (user_id, title, content, is_public)
            )
            dream_id = cur.fetchone()[0]  # 新しいメモのIDを取得
            conn.commit()  # 変更をコミット
            cur.close()
            conn.close()
            return dream_id
        except Exception as e:
            print(f"Error occurred while creating dream: {e}")
            return None

    @classmethod
    def update(cls, dream_id, title, content, is_public, likes):
        # ドリームデータの一つを更新
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            cur = conn.cursor()
            cur.execute(
                "UPDATE dreams SET title = %s, content = %s, is_public = %s, likes = %s WHERE id = %s",
                (title, content, is_public, likes, dream_id)
            )
            conn.commit()  # 変更をコミット
            cur.close()
            conn.close()

            if cur.rowcount == 0:
                print(f"Dream with id {dream_id} not found.")
                return False
            return True
        except Exception as e:
            print(f"Error occurred while updating dream: {e}")
            return None

    @classmethod
    def delete(cls, dream_id):
        """メモを削除"""
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            cur = conn.cursor()
            cur.execute("DELETE FROM dreams WHERE id = %s", (dream_id,))
            conn.commit()  # 変更をコミット
            cur.close()
            conn.close()
            if cur.rowcount == 0:
                print(f"Dream with id {dream_id} not found.")
                return False

            return True
        except Exception as e:
            print(f"Error occurred while deleting Dream: {e}")
            return False
