from flask import Blueprint, jsonify, request
from flask_login import login_user
from models.user_model import User  # userモデル読み込み

# ブループリント作成
auth_bp = Blueprint('auth', __name__)

# ログイン機能
@auth_bp.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        credentials = request.get_json()

        email = credentials['email']
        password = credentials['password']

        # ユーザー情報を取得
        user = User.get_user_by_email(email)
        if user and user.check_password(password):
            login_user(user)
            response_data = { # return user info
                "username": "{}".format(user.username),
                "email": "{}".format(user.email)
            }
            return jsonify(response_data), 200
        else:
            return "",401 #failed

@auth_bp.route('/test', methods=['GET'])
def test(): # 生存確認API
    if request.method == 'GET':
        return jsonify({"message": "Hello"}), 200
