from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from routes.dream import dream_bp
from models.user_model import User  # Userモデルのインポート
from routes.auth import auth_bp
from routes.public_dream import public_dream_bp

app = Flask(__name__)

CORS(app,supports_credentials=True) # credentialsをtrueにする

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
app.register_blueprint(dream_bp)
app.register_blueprint(public_dream_bp)

if __name__ == "__main__":
    app.run(debug=True)
