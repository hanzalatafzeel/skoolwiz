from datetime import datetime
from app import db
from sqlalchemy import Integer, String, Boolean, DateTime

class Todo(db.Model):
    id = db.Column(Integer, primary_key=True)
    title = db.Column(String(100), nullable=False)
    description = db.Column(String(200))
    completed = db.Column(Boolean, default=False)
    created_at = db.Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed,
            'created_at': self.created_at.isoformat()
        }