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
