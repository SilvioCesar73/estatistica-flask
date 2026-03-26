# routes/auth.py
from flask import (
    Blueprint, render_template, request,
    session, jsonify
)
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User

auth_blueprint = Blueprint("auth", __name__, url_prefix="/auth")

# ---------- FORMULÁRIO DE CADASTRO (HTML) ----------
@auth_blueprint.route("/register", methods=["GET"])
def register_form():
    return render_template("register.html")        # /register devolve o template

# ---------- REGISTRO (API JSON) ----------
@auth_blueprint.route("/register", methods=["POST"])
def api_register():
    data = request.get_json() or {}
    nome  = data.get("nome", "").strip()
    email = data.get("email", "").strip()
    senha = data.get("senha", "")
    conf  = data.get("confirmar_senha", "")

    if not nome or not email or not senha:
        return jsonify({"error": "Campos obrigatórios faltando"}), 400
    if senha != conf:
        return jsonify({"error": "Senhas não coincidem"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "E-mail já cadastrado"}), 400

    user = User(username=nome, email=email)
    user.pw_hash = generate_password_hash(senha)
    db.session.add(user)
    db.session.commit()

    session["user_id"] = user.id                    # login automático
    return jsonify({"success": True})

# ---------- LOGIN (API JSON) ----------
@auth_blueprint.route("/login", methods=["POST"])
def api_login():
    data  = request.get_json() or {}
    email = data.get("email", "").strip()
    senha = data.get("senha", "")

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.pw_hash, senha):
        return jsonify({"error": "Credenciais inválidas"}), 401

    session["user_id"] = user.id
    return jsonify({"success": True})

# ---------- LOGOUT (API JSON) ----------
@auth_blueprint.route("/logout", methods=["POST"])
def api_logout():
    session.pop("user_id", None)
    return jsonify({"success": True})
