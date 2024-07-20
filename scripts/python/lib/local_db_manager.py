from datetime import datetime
import json
import os

from utils import normalize_text


class LocalDBManager:
    def __init__(self):
        self.__path = ""
        self.__data_db_names = ["lines", "projects", "regions", "types", "pdf"]
        self.__connect()

    def __connect(self):
        db_path = os.path.abspath(
            os.path.join(os.path.dirname(__file__), "..", "..", "..", "db")
        )
        os.makedirs(db_path, exist_ok=True)
        self.__path = os.path.abspath(db_path)

    def get(self, file: str):
        if file not in self.__data_db_names:
            print(f"{file} is not a valid database name.")
            return {"id": file, "lastUpdate": None, "length": 0, "data": []}

        file_path = os.path.join(self.__path, f"{file}.json")

        try:
            if os.path.getsize(file_path) == 0:
                with open(file_path, "w", encoding="utf-8") as db_file:
                    template = {
                        "id": file,
                        "lastUpdate": str(datetime.now()),
                        "length": 0,
                        "data": [],
                    }

                    json.dump(template, db_file, ensure_ascii=False)
                return template

            with open(file_path, "r", encoding="utf-8") as db_file:
                db_data = json.load(db_file)
            return db_data
        except FileNotFoundError:
            # if file not found create one with basic template
            with open(file_path, "w", encoding="utf-8") as db_file:
                template = {
                    "id": file,
                    "lastUpdate": str(datetime.now()),
                    "length": 0,
                    "data": [],
                }
                json.dump(template, db_file, ensure_ascii=False)
            return template
        except json.JSONDecodeError:
            print(f"Error decoding JSON file {file_path}.")
            return {"id": file, "lastUpdate": None, "length": 0, "data": []}

    def insert(self, file: str, data: list):
        file_path = os.path.join(self.__path, f"{file}.json")
        try:
            db_data = self.get(file)

            with open(file_path, "w", encoding="utf-8") as db_file:
                # TODO: throw error 'not readable'
                new_data = {
                    **db_data,
                    "lastUpdate": str(datetime.now()),
                    "length": len(data),
                    "data": data,
                }

                json.dump(new_data, db_file, ensure_ascii=False)
            print(f"Successfully saved data on: {file} database")
        except Exception as e:
            print(f"Error saving data on {file} database: {str(e)}")

    def get_all_data(self):
        lines = self.get("lines")
        projects = self.get("projects")
        regions = self.get("regions")
        types = self.get("types")
        pdf = self.get("pdf")

        return {
            "lines": lines["data"],
            "projects": projects["data"],
            "regions": regions["data"],
            "types": types["data"],
            "pdf": pdf["data"],
        }
