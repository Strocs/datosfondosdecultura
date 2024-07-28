from datetime import datetime
import json
import os

from lib.utils import base_path


class LocalDBManager:
    def __init__(self):
        self.__data_db_names = ["lines", "projects", "regions", "funds", "pdf"]

    def get(self, file: str):
        if file not in self.__data_db_names:
            print(f"{file} is not a valid database name.")
            return {"lastUpdate": None, "data": []}

        file_path = base_path("db", "json", file=f"{file}.json")

        try:
            if os.path.getsize(file_path) == 0:
                with open(file_path, "w", encoding="utf-8") as db_file:
                    template = {
                        "lastUpdate": str(datetime.now()),
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
                    "lastUpdate": str(datetime.now()),
                    "data": [],
                }
                json.dump(template, db_file, ensure_ascii=False)
            return template
        except json.JSONDecodeError:
            print(f"Error decoding JSON file {file_path}.")
            return {"lastUpdate": None, "data": []}

    def insert(self, file: str, data: list):
        file_path = base_path("db", "json", file=f"{file}.json")
        try:

            with open(file_path, "w", encoding="utf-8") as db_file:
                # TODO: throw error 'not readable'
                new_data = {
                    "lastUpdate": str(datetime.now()),
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
        funds = self.get("funds")
        pdf = self.get("pdf")

        return {
            "lines": lines["data"],
            "projects": projects["data"],
            "regions": regions["data"],
            "funds": funds["data"],
            "pdf": pdf["data"],
        }
