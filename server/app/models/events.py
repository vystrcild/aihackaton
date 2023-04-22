from app import db
from datetime import datetime

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    dimension = db.Column(db.String(255), nullable=False)
    text = db.Column(db.Text, nullable=False)
    sentiment = db.Column(db.String(255), nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)
    weight = db.Column(db.String(255), nullable=False)

    def __init__(self, dimension, text, sentiment, datetime, weight):
        self.dimension = dimension
        self.text = text
        self.sentiment = sentiment
        self.datetime = datetime
        self.weight = weight


    @classmethod
    def save_event_to_db(cls, event):
        datetime_field = datetime.strptime(event["datetime"], "%Y-%m-%d %H:%M:%S.%f")
        new_event = cls(dimension=event["dimension"], text=event["text"], sentiment=event["sentiment"], datetime=datetime_field, weight=event["weight"])
        db.session.add(new_event)
        db.session.commit()
