import psycopg2
from werkzeug.security import generate_password_hash

# データベースに接続するための設定
dbname = "dreamsink"
user = "test"  # 使用するDBのユーザー名
password = "testpassword"  # 使用するDBのパスワード
host = "localhost"
port = "5432"

# サンプルデータ
users = [
    {"email": "test1@example.com", "password": "password1"},
    {"email": "test2@example.com", "password": "password2"},
    {"email": "test3@example.com", "password": "password3"},
]

# パスワードをハッシュ化してデータベースに挿入
def insert_sample_data():
    # PostgreSQLに接続
    conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host, port=port)
    cur = conn.cursor()

    for user_data in users:
        # パスワードをハッシュ化
        hashed_password = generate_password_hash(user_data["password"])

        # SQL文を作成してデータを挿入
        sql = "INSERT INTO users (email, password_hash) VALUES (%s, %s)"
        cur.execute(sql, (user_data["email"], hashed_password))

    # 変更をコミットして接続を閉じる
    conn.commit()
    cur.close()
    conn.close()

# サンプルデータを挿入
insert_sample_data()
print("サンプルデータが挿入されました。")
