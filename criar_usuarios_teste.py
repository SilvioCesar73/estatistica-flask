import sqlite3
from pathlib import Path
from werkzeug.security import generate_password_hash

DB_PATH = Path("instance/estatistica.db")

USUARIOS = [
    {
        "username": "ariadne01",
        "email": "ariadnesfonseca@gmail.com",
        "senha": "RevCasca#Ari01",
    },
    {
        "username": "alaisa01",
        "email": "alaisapc@gmail.com",
        "senha": "RevCasca#Ala01",
    },
    {
        "username": "vaccari01",
        "email": "av.vaccari@gmail.com",
        "senha": "RevCasca#Vac01",
    },
    {
        "username": "ariele01",
        "email": "arielereisdorfer@hotmail.com",
        "senha": "RevCasca#Arie01",
    },
]


def main() -> None:
    if not DB_PATH.exists():
        raise FileNotFoundError(f"Banco não encontrado: {DB_PATH.resolve()}")

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row

    criados = []
    pulados = []

    try:
        cur = conn.cursor()

        for usuario in USUARIOS:
            username = usuario["username"].strip()
            email = usuario["email"].strip().lower()
            senha = usuario["senha"]

            existente = cur.execute(
                """
                SELECT id, username, email
                FROM users
                WHERE username = ? OR email = ?
                """,
                (username, email),
            ).fetchone()

            if existente:
                pulados.append(
                    {
                        "username": username,
                        "email": email,
                        "motivo": f"já existe usuário/id={existente['id']} ({existente['username']} / {existente['email']})"
                    }
                )
                continue

            pw_hash = generate_password_hash(senha)

            cur.execute(
                """
                INSERT INTO users (username, email, pw_hash)
                VALUES (?, ?, ?)
                """,
                (username, email, pw_hash),
            )

            criados.append(
                {
                    "id": cur.lastrowid,
                    "username": username,
                    "email": email,
                }
            )

        conn.commit()

    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

    print("\n=== USUÁRIOS CRIADOS ===")
    if criados:
        for item in criados:
            print(f"[OK] id={item['id']} | {item['username']} | {item['email']}")
    else:
        print("Nenhum usuário novo foi criado.")

    print("\n=== USUÁRIOS PULADOS ===")
    if pulados:
        for item in pulados:
            print(f"[PULADO] {item['username']} | {item['email']} | {item['motivo']}")
    else:
        print("Nenhum usuário foi pulado.")

    print("\nConcluído.")


if __name__ == "__main__":
    main()