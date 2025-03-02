from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from models.user import User  # userモデル読み込み

# ブループリント作成
auth_bp = Blueprint('auth', __name__)

# ログイン機能
@auth_bp.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        # データ取得
        credentials = request.get_json()
        email = credentials['email']
        password = credentials['password']
        # ユーザー情報を取得
        user = User.get_user_by_email(email)
        if user and user.check_password(password):
            access_token = create_access_token(identity=str(user.id))
            response_data = { # return user info
                "name": "{}".format(user.username),
                "email": "{}".format(user.email),
                "id": user.id
            }
            response = jsonify(response_data)
            # headerにjwt tokenを仕込む
            # print(response)
            response.headers["Authorization"] = "Bearer {}".format(access_token)
            return response
        else:
            return "",401 #failed

@auth_bp.route('/test', methods=['GET'])
def test(): # 生存確認API
    if request.method == 'GET':
        return jsonify({"message": "Hello"}), 200
