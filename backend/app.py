from flask import Flask
from flask_login import LoginManager
from routes.auth import auth_bp
from models.user_model import User  # Userモデルのインポート

app = Flask(__name__)

# Flask-Loginのセットアップ
app.config['SECRET_KEY'] = 'your_secret_key'  # セッション用のシークレットキー（必須）
login_manager = LoginManager()
login_manager.login_view = 'auth.login'
login_manager.init_app(app)

# ユーザーを取得するためのuser_loader関数
@login_manager.user_loader
def load_user(user_id):
    return User.get_user_by_id(user_id)  # ユーザーIDを使ってデータベースからユーザーを取得する

# Blueprintの登録
app.register_blueprint(auth_bp)

if __name__ == "__main__":
    app.run(debug=True)
