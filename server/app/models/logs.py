from app import db
from sqlalchemy import CheckConstraint, desc
from datetime import datetime

class Log(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(255), CheckConstraint("type in ('system', 'human', 'ai')"), nullable=False)
    text = db.Column(db.Text, nullable=False)
    room = db.Column(db.String(255), nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)
    is_cleared = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, user, type, text, room, datetime):
        self.user = user
        self.type = type
        self.text = text
        self.room = room
        self.datetime = datetime

    def __repr__(self):
        return f"<Log {self.id} - {self.text} by {self.type}-{self.user} in {self.room} at {self.datetime}>"

    @classmethod
    def save_log_to_db(cls, log):
        datetime_field = datetime.strptime(log["datetime"], "%Y-%m-%d %H:%M:%S.%f")
        new_log = cls(user=log["user"], type=log["type"], text=log["text"], room=log["room"], datetime=datetime_field)
        db.session.add(new_log)
        db.session.commit()

    @classmethod
    def get_last_n_logs(cls, n, room=None):
        query = cls.query
        if room:
            query = query.filter_by(room=room, is_cleared=False)

        logs = query.order_by(desc(cls.datetime)).limit(n).all()
        return logs