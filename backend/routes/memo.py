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
    return jsonify({"memos": [memo.__dict__ for memo in memos]}), 200
