import os


def get_file_path_from_db(file_name: str) -> str:
    db_path = os.path.abspath("../db/")
    os.makedirs(db_path, exist_ok=True)
    return os.path.abspath(f"{db_path}/{file_name}")
