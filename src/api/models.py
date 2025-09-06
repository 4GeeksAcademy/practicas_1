from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)




    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    

class Task(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(120), nullable = False)
    done: Mapped[str] = mapped_column(Boolean(), nullable = False)
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default = db.func.now(), nullable=False) 
 
    def serialize(self):
        return{
            "id" : self.id,
            "title" : self.title,
            "done" : self.done,
            "created_at" : self.created_at.isoformat() if self.created_at else None
        }

    