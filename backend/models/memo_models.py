import psycopg2
from flask_login import current_user

DB_CONFIG = {  # connect info
    "dbname": "dreamsink",
    "user": "test",
    "password": "test",
    "host": "localhost",
    "port": "5432"
}

class Memo:
    def __init__(self, id, user_id, title, content, is_public):
        self.id = id
        self.user_id = user_id
        self.title = title
        self.content = content
        self.is_public = is_public

    @classmethod  # ユーザーのメモ一覧を取得
    def get_all_by_user(cls, user_id):
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            cur = conn.cursor()
            # user_idに該当するメモデータを取得
            cur.execute("SELECT id, user_id, title, content, is_public FROM memos WHERE user_id = %s", (user_id,))
            memos = [cls(*row) for row in cur.fetchall()]
            cur.close()
            conn.close()
            return memos
        except Exception as e:
            print(f"Error occurred while fetching user memos: {e}")
            return None

    @classmethod  # idに基づいて、特定のメモを取得
    def get_by_id(cls, id):
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            cur = conn.cursor()
            cur.execute("SELECT id, user_id, title, content, is_public FROM memos WHERE id = %s", (id,))
            result = cur.fetchone()
            if result:
                cur.close()
                conn.close()
                return cls(*result)
            else:
                cur.close()
                conn.close()
                print(f"Error occurred getting memo with id {id}")
                return None  # メモが見つからなかった場合
        except Exception as e:
            print(f"Error occurred while fetching memo by id: {e}")
            return None

    @classmethod # 新しいメモの作成
    def create(cls, user_id, title, content, is_public=False):
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO memos (user_id, title, content, is_public) VALUES (%s, %s, %s, %s) RETURNING id",
                (user_id, title, content, is_public)
            )
            memo_id = cur.fetchone()[0]  # 新しいメモのIDを取得
            conn.commit()  # 変更をコミット
            return memo_id
        except Exception as e:
            print(f"Error occurred while creating memo: {e}")
            return None
        finally:
            if cur:
                cur.close()  # カーソルを閉じる
            if conn:
                conn.close()  # 接続を閉じる

    @classmethod
    def update(cls, memo_id, title, content, is_public):
        """メモを更新"""
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            cur = conn.cursor()
            cur.execute(
                "UPDATE memos SET title = %s, content = %s, is_public = %s WHERE id = %s",
                (title, content, is_public, memo_id)
            )
            conn.commit()  # 変更をコミット
            if cur.rowcount == 0:
                print(f"Memo with id {memo_id} not found.")
        except Exception as e:
            print(f"Error occurred while updating memo: {e}")
        finally:
            if cur:
                cur.close()  # カーソルを閉じる
            if conn:
                conn.close()  # 接続を閉じる

    @classmethod
    def delete(cls, memo_id):
        """メモを削除"""
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            cur = conn.cursor()
            cur.execute("DELETE FROM memos WHERE id = %s", (memo_id,))
            conn.commit()  # 変更をコミット
            if cur.rowcount == 0:
                print(f"Memo with id {memo_id} not found.")
        except Exception as e:
            print(f"Error occurred while deleting memo: {e}")
        finally:
            if cur:
                cur.close()  # カーソルを閉じる
            if conn:
                conn.close()  # 接続を閉じる

