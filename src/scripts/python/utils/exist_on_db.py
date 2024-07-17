import json


def exist_on_db(id: int, db) -> bool:

    existing_data = json.load(db)
    for entry in existing_data:
        if id == entry["id"]:
            return True
    return False
