# app.py
import os
from flask import Flask, render_template
from models import db
from routes.main import main_blueprint
from routes.auth import auth_blueprint
from routes.normalidade import normalidade_bp

app = Flask(__name__)

# --- Configurações básicas ---
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, "instance", "estatistica.db")

app.config["SECRET_KEY"] = "troque-por-uma-chave-bem-segura"
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# --- Registro dos blueprints ---
app.register_blueprint(main_blueprint)
app.register_blueprint(auth_blueprint)
app.register_blueprint(normalidade_bp)

# --- Alias para a página de cadastro (/register) ---
@app.route("/register")
def register_page():
    return render_template("register.html")

if __name__ == "__main__":
    app.run(debug=True)
