from flask import Blueprint, request,jsonify
from flask_login import login_user
from models.user_model import User # userモデル読み込み
# ブループリント作成
auth_bp = Blueprint('auth', __name__)
# ログイン機能
@auth_bp.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # ユーザー情報を取得
        user = User.get_user_by_username(username)
        if user and user.check_password(password):
            login_user(user)
            # return '',200 # success
            return jsonify({"message": "Login successful"}), 200
        else:
            # return '',401 # unauthorized
            return jsonify({"message": "Login failed"}), 401

@auth_bp.route('/test', methods=['GET'])
def test(): # 生存確認API
    if request.method == 'GET':
        return jsonify({"message": "Hello"}), 200