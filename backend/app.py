from flask import Flask
from flask_cors import CORS
from routes.dream import dream_bp
from routes.auth import auth_bp
from routes.public_dream import public_dream_bp
from datetime import timedelta
from flask_jwt_extended import JWTManager
# from flask import request

app = Flask(__name__)

# CORSのセットアップ
CORS(app,
     resources={r"/*": {"origins": "*"}},
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     expose_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "OPTIONS", "DELETE", "PUT"])

# use jwt
app.config["JWT_SECRET_KEY"] = "my-jwt-key"

# JWTの設定
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=10)
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_TYPE"] = "Bearer"
app.config["JWT_COOKIE_SAMESITE"] = "Strict"
app.config["JWT_COOKIE_SECURE"] = False  # ローカル環境のため False

jwt = JWTManager(app)  # ← init_app(app) は不要

# Blueprintの登録
app.register_blueprint(auth_bp)
app.register_blueprint(dream_bp)
app.register_blueprint(public_dream_bp)

if __name__ == "__main__":
    app.run(debug=True)
