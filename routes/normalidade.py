# routes/normalidade.py
from flask import Blueprint, request, jsonify
from normalidade import aplicar_shapiro, aplicar_ks

normalidade_bp = Blueprint('normalidade', __name__)

@normalidade_bp.route('/api/teste-normalidade', methods=['POST'])
def teste_normalidade():
    dados = request.json
    valores = dados.get("valores", [])
    metodo = dados.get("metodo", "shapiro")

    if not valores or not isinstance(valores, list):
        return jsonify({"erro": "Lista de valores ausente ou inválida."}), 400

    try:
        if metodo == "shapiro":
            resultado = aplicar_shapiro(valores)
        elif metodo == "ks":
            resultado = aplicar_ks(valores)
        else:
            return jsonify({"erro": "Método inválido. Use 'shapiro' ou 'ks'."}), 400

        return jsonify(resultado)

    except Exception as e:
        return jsonify({"erro": str(e)}), 500
