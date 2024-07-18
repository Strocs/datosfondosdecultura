from lib.db_manager import DBManager


db = DBManager(use_json=True)
db.connect()

result = db.get("test")

print(result["data"] if result is not None else None)
