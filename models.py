# models.py
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"

    id       = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80),  unique=True, nullable=False)
    email    = db.Column(db.String(120), unique=True, nullable=False)
    pw_hash  = db.Column(db.String(128), nullable=False)

    def set_password(self, raw_pwd: str):
        self.pw_hash = generate_password_hash(raw_pwd)

    def check_password(self, raw_pwd: str) -> bool:
        return check_password_hash(self.pw_hash, raw_pwd)
