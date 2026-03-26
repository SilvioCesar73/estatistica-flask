# normalidade.py
from scipy.stats import shapiro, kstest, norm
import numpy as np

def aplicar_shapiro(valores):
    try:
        stat, p = shapiro(valores)
        return {
            "teste": "Shapiro-Wilk",
            "p_valor": round(p, 4),
            "estatistica": round(stat, 4),
            "normal": bool(p > 0.05),  # <-- correção aqui
            "mensagem": "Os dados {} distribuição normal.".format("seguem" if p > 0.05 else "não seguem")
        }
    except Exception as e:
        return {"erro": str(e)}

def aplicar_ks(valores):
    try:
        valores = np.array(valores)
        media = np.mean(valores)
        desvio = np.std(valores)
        stat, p = kstest(valores, 'norm', args=(media, desvio))
        return {
            "teste": "Kolmogorov-Smirnov",
            "p_valor": round(p, 4),
            "estatistica": round(stat, 4),
            "normal": bool(p > 0.05),  # <-- correção aqui também
            "mensagem": "Os dados {} distribuição normal.".format("seguem" if p > 0.05 else "não seguem")
        }
    except Exception as e:
        return {"erro": str(e)}

