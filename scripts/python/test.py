from lib.db_manager import DBManager


db = DBManager(use_json=True)
db.connect()

result = db.find("2024", "pdf-links")

print(result["data"] if result is not None else None)
