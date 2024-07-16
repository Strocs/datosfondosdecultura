import json
from scripts.python.utils import get_file_path_from_db


def get_data_from_json(file_name: str) -> list:
    file_path = get_file_path_from_db(file_name)

    try:
        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        print(f"File {file_path} not found.")
        return []
    except json.JSONDecodeError:
        print(f"Error decoding JSON file {file_path}.")
        return []
