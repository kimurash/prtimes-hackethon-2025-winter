from flask import Blueprint, jsonify, request, make_response
from models.user import User  # userモデル読み込み
from flask_jwt_extended import (create_access_token, set_access_cookies,unset_access_cookies, verify_jwt_in_request)

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
            access_token = create_access_token(identity=str(user.id)) # JWTトークン生成
            response_data = { # return user info
                "username": "{}".format(user.username),
                "email": "{}".format(user.email),
                "id": "{}".format(user.id), # テスト用にidも返してみる
            }
            response =  make_response(jsonify(response_data), 200) # アクセストークンとデータを返す
            response.headers['Authorization'] = f'Bearer {access_token}'
            print(response.headers)
            return response
        else:
            return "",401 #failed

@auth_bp.route('/test', methods=['GET'])
def test(): # 生存確認API
    if request.method == 'GET':
        return jsonify({"message": "Hello"}), 200

