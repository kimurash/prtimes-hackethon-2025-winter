from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models.dream_models import Dream

public_dream_bp = Blueprint('public_dream', __name__)

# 公開されるドリーム取得
@public_dream_bp.route('/public/dream', methods=['GET'])
# @login_required # 本番用
def view_public_dream():
    public_dreams = Dream.get_all_public_dreams()
    if public_dreams:
        return jsonify([dream.__dict__ for dream in public_dreams]), 200
    else:
        return jsonify({'message': 'No public dreams found'}),404

# いいねのインクリメントを行うAPI
@public_dream_bp.route('/public/like/<int:dream_id>',methods=['POST'])
#  @login_required # 本番用
def increment_like_count(dream_id):
    dream = Dream.get_by_id(dream_id) # 該当のデータ抽出
    dream_count = dream.likes + 1
    # インクリメントした「いいね数」に更新
    if dream.update_likes(dream_id=dream_id,likes=dream_count):
        return jsonify({'message': 'Successfully updated like_count'}), 200
    else:
        return jsonify({'message': 'Failed to update like_count'}), 404

