from lib.db_connection import DBConnection


db = DBConnection(use_json=True)
db.connect()

proj = db.get_data("projects.json")
print(len(proj))  # type: ignore
