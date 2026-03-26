from flask import (
    Blueprint, render_template, jsonify,
    session, redirect, url_for
)
import json, os
from models import User                         # modelo de usuário

main_blueprint = Blueprint("main", __name__)

@main_blueprint.route("/")
def index():
    return render_template("index.html")

@main_blueprint.route("/dashboard")
def dashboard():
    # garante que só usuários logados entrem
    if "user_id" not in session:
        return redirect(url_for("main.index"))

    user = User.query.get(session["user_id"])
    return render_template(
        "dashboard.html",
        username=user.username,
        user_id=user.id
    )

@main_blueprint.route("/api/testes")
def api_testes():
    caminho = os.path.join("static", "data", "testes_estatisticos.json")
    with open(caminho, encoding="utf-8") as f:
        dados = json.load(f)
    return jsonify(dados)
