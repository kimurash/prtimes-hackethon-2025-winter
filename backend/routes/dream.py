from flask import Blueprint, request, jsonify,session
from models.dream_models import Dream
from flask_jwt_extended import get_jwt_identity, jwt_required,decode_token

dream_bp = Blueprint('dream', __name__)

# ドリーム取得 自分の作成したもの全て
@dream_bp.route('/dreams', methods=['GET'])
# @login_required # 実験用
@jwt_required()
def get_dreams():
    # debug code
    # token = request.headers.get('Authorization', "").replace("Bearer ", "")
    # print(token)
    # try:
    #     decoded = decode_token(token)  # JWT をデコードしてみる
    #     print("Decoded Token:", decoded)  # デコード結果を表示
    # except Exception as e:
    #     print("Error decoding token:", str(e))
    #     return jsonify({"error": "Invalid token", "message": str(e)}), 422
    user_id = get_jwt_identity() # jwtからidentity(userid)を取得
    if user_id is None:
        return jsonify({"error": "You are not logged in"}), 401

    dreams = Dream.get_all_by_user(user_id)  # テスト用
    return jsonify([dream.__dict__ for dream in dreams]), 200

# ドリーム取得、指定したドリームの中身を返す
@dream_bp.route('/dreams/<int:dream_id>', methods=['GET'])
# @login_required # 実験用
def get_one_dream(dream_id):
    dream = Dream.get_by_id(dream_id)
    if dream is None:
        return jsonify({"error": "Not found"}), 404  # ドリームが見つからない場合は404エラーを返す

    return jsonify(dream.__dict__), 200
# ドリーム新規作成
@dream_bp.route('/dreams', methods=['POST'])
# @login_required # 実験用
def create_dream():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    # user_id = current_user.id  # 本番
    user_id = 1 # テスト用

    if not title or not content:  # 内容の確認
        return jsonify({"error": "タイトルと内容は必須です"}), 400
    # ドリームを作成してSQL保存、新規なので非公開
    dream_id = Dream.create(user_id, title, content, is_public=False)

    return jsonify({"message": "ドリームを作成しました", "dream_id": dream_id}), 201

# ドリーム削除
@dream_bp.route('/dreams/<int:dream_id>', methods=['DELETE'])
# @login_required # 実験用
def delete_dream(dream_id):  # ドリームIDに基づいて削除
    if Dream.delete(dream_id):
        return jsonify({"success": "success to delete"}), 200
    else:
        return jsonify({"error": "An error occurred"}), 400

# ドリーム更新
@dream_bp.route('/dreams/<int:dream_id>', methods=['PUT'])
# @login_required # 実験用
def update_dream(dream_id):
    # user_id = current_user.id # 本番
    user_id = 1
    # define data from front
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    is_public = data.get('is_public')
    likes = data.get('likes')

    if Dream.update(dream_id,title, content, is_public, likes):
        return jsonify({"success": "finished"}), 200
    else:
        return jsonify({"error": "failed to update"}), 400


