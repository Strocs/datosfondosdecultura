from datetime import date
import json
import os

from utils import normalize_text


class DBManager:
    def __init__(self, use_json=True):
        self.use_json = use_json
        self.__path = ""
        self.__data_db_names = ["lines", "projects", "regions", "types", "pdf-links"]

    def connect(self):
        if self.use_json:
            db_path = os.path.abspath(
                os.path.join(os.path.dirname(__file__), "..", "..", "..", "db")
            )
            os.makedirs(db_path, exist_ok=True)
            self.__path = os.path.abspath(db_path)
        else:
            # Do SQL connection
            raise ValueError("SQL Connection is not allowed yet.")

    def get(self, file: str):
        if self.use_json:
            file_path = os.path.join(self.__path, f"{file}.json")
            try:
                with open(file_path, "r", encoding="utf-8") as db_file:
                    db_data = json.load(db_file)
                return db_data
            except FileNotFoundError:
                # if file not found create one with basic template
                with open(file_path, "w", encoding="utf-8") as db_file:
                    template = {
                        "id": file,
                        "lastUpdate": date.today(),
                        "data": [],
                    }
                    json.dump(template, db_file, ensure_ascii=False)
                return template
            except json.JSONDecodeError:
                print(f"Error decoding JSON file {file_path}.")

        else:
            # Do SQL connection
            raise ValueError("SQL Connection is not allowed yet.")

    def save(self, file: str, data: list):
        if self.use_json:
            file_path = os.path.join(self.__path, f"{file}.json")
            try:
                with open(file_path, "w", encoding="utf-8") as db_file:
                    db_data = json.load(db_file)

                    new_data = {
                        **db_data,
                        "lastUpdate": date.today(),
                        "data": data,
                    }

                    json.dump(new_data, db_file, ensure_ascii=False)
                print(f"Successfully saved data on: {file} database")
            except Exception as e:
                print(f"Error saving data on {file} database: {str(e)}")

        else:
            # Do SQL connection
            raise ValueError("SQL Connection is not allowed yet.")

    def find(self, query: str, where):
        if self.use_json:
            if where not in self.__data_db_names:
                print(f"{where} is not a valid database name.")
                return None

            db_list = self.get(where)
            if db_list is None:
                return None

            for entry in db_list["data"]:
                if any(
                    normalize_text(query.lower()) in str(value).lower()
                    for key, value in entry.items()
                ):
                    return entry
            print(f"No match was found in {where} with query: {query}")

        else:
            # Do SQL connection
            raise ValueError("SQL Connection is not allowed yet.")
