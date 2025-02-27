from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.dream import dream_bp
from routes.public_dream import public_dream_bp

app = Flask(__name__)

CORS(app)

# Blueprintの登録
app.register_blueprint(auth_bp)
app.register_blueprint(dream_bp)
app.register_blueprint(public_dream_bp)

if __name__ == "__main__":
    app.run(debug=True)
