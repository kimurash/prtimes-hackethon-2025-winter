from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models.dream_models import Dream

dream_bp = Blueprint('dream', __name__)

# ドリーム取得 自分の作成したもの全て
@dream_bp.route('/dreams', methods=['GET'])
# @login_required # 実験用
def get_dreams():
    # dreams = Dream.get_all_by_user(current_user.id)
    dreams = Dream.get_all_by_user(1)  # テスト用
    return jsonify([dream.__dict__ for dream in dreams]), 200

# ドリーム取得、指定したドリームの中身を返す
@dream_bp.route('/dreams/<int:dream_id>', methods=['GET'])
# @login_required # 実験用
def get_one_dream(dream_id):
    dream = Dream.get_by_id(dream_id)
    if dream is None:
        return jsonify({"error": "指定されたドリームは存在しません"}), 404  # ドリームが見つからない場合は404エラーを返す

    return jsonify(dream.__dict__), 200
# ドリーム新規作成
@dream_bp.route('/dreams', methods=['POST'])
# @login_required # 実験用
def create_dream():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    # user_id = current_user.id  # 本番
    user_id = 1  # テスト用

    if not title or not content:  # 内容の確認
        return jsonify({"error": "タイトルと内容は必須です"}), 400
    # ドリームを作成してSQL保存、新規なので非公開
    dream_id = Dream.create(user_id, title, content, is_public=False)

    return jsonify({"message": "ドリームを作成しました", "dream_id": dream_id}), 201

# ドリーム削除
@dream_bp.route('/dreams/<int:dream_id>', methods=['DELETE'])
def delete_dream(dream_id):  # ドリームIDに基づいて削除
    if Dream.delete(dream_id):
        return jsonify({"success": "削除完了！"}), 200
    else:
        return jsonify({"error": "削除失敗"}), 400
