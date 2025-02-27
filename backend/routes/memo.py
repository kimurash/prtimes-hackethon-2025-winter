from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models.memo_models import Memo

memo_bp = Blueprint('memo', __name__)

# メモ取得 自分の作成したもの全て
@memo_bp.route('/memos', methods=['GET'])
# @login_required # 実験用
def get_memos():
    # memos = Memo.get_all_by_user(current_user.id)
    memos = Memo.get_all_by_user(1) # テスト用
    return jsonify([memo.__dict__ for memo in memos]), 200

# メモ取得、指定したメモの中身を返す
@memo_bp.route('/memos/<int:memo_id>', methods=['GET'])
# @login_required # 実験用
def get_one_memo(memo_id):
    memo = Memo.get_by_id(memo_id)
    return jsonify(memo.__dict__) ,200

# メモ新規作成
@memo_bp.route('/memos', methods=['POST'])
# @login_required # 実験用
def create_memo():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    # user_id = current_user.id # 本番
    user_id = 1 # テスト用

    if not title or not content: # 内容の確認
        return jsonify({"error": "タイトルと内容は必須です"}), 400
    # メモを作成してSQL保存、新規なので非公開
    memo_id = Memo.create(user_id, title, content, is_public=False)

    return jsonify({"message": "メモを作成しました", "memo_id": memo_id}), 201

# メモ削除
@memo_bp.route('/memos/<int:memo_id>', methods=['DELETE'])
def delete_memo(memo_id): # メモIDに基づいて削除
    if Memo.delete(memo_id) is True:
        return jsonify({"success": "削除完了！"}),200
    else:
        return jsonify({"error": "削除失敗"}),400


