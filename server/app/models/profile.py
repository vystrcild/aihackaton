from app import db

class Profile(db.Model):
    dimension = db.Column(db.String(255),primary_key=True, nullable=False)
    summary = db.Column(db.String(255), nullable=False)

    def __init__(self, dimension, summary):
        self.dimension = dimension
        self.summary = summary

    @classmethod
    def add_dimension(cls, dimension, new_summary):
        new_values = {
            'dimension': dimension,
            'summary': new_summary
        }
        new_dimension = cls(**new_values)
        db.session.add(new_dimension)
        db.session.commit()
        return new_dimension

    @classmethod
    def update_dimension(cls, dimension, new_summary):
        new_values = {
            'dimension': dimension,
            'summary': new_summary
        }

        query = cls.query
        result = query.filter_by(dimension=dimension)
        result.summary = new_summary
        db.session.commit()

    @classmethod
    def get_dimension(cls, dimension):
        query = cls.query

        dimension = query.filter_by(dimension=dimension).first()
        return dimension.summary
