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

