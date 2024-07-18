import json
import os

from utils import normalize_text


class DBConnection:
    def __init__(self, use_json=True):
        self.use_json = use_json
        self.path = ""

    def connect(self):
        if self.use_json:
            db_path = os.path.abspath(
                os.path.join(os.path.dirname(__file__), "..", "..", "..", "db")
            )
            os.makedirs(db_path, exist_ok=True)
            self.path = os.path.abspath(db_path)
        else:
            # Do SQL connection
            raise ValueError("SQL Connection is not allowed yet.")

    def get_data(self, file_path):
        if self.use_json:
            file_path = os.path.join(self.path, "data", file_path)
            try:
                with open(file_path, "r", encoding="utf-8") as file:
                    data = json.load(file)
                return data
            except FileNotFoundError:
                print(f"File {file_path} not found.")
            except json.JSONDecodeError:
                print(f"Error decoding JSON file {file_path}.")
        else:
            # Do SQL connection
            raise ValueError("SQL Connection is not allowed yet.")

    def save_data(self, data, file):
        if self.use_json:
            file_path = os.path.join(self.path, "data", file)
            try:
                if not os.path.exists(file_path) or os.path.getsize(file_path) == 0:
                    with open(file_path, "w", encoding="utf-8") as outfile:
                        json.dump([data], outfile, ensure_ascii=False)
                    return
                else:
                    with open(file_path, "r+", encoding="utf-8") as outfile:
                        if self._exist_on_db(data["id"], outfile):
                            return

                        outfile.seek(
                            0, 2
                        )  # Move the cursor to the position just before the last character
                        outfile.seek(outfile.tell() - 1)

                        # if outfile.read(1) == "]":
                        #     outfile.seek(-1, os.SEEK_END)
                        #     outfile.truncate()
                        # else:
                        #     outfile.seek(0, os.SEEK_END)

                        outfile.write(",")
                        json.dump(data, outfile, ensure_ascii=False)
                        outfile.write("]")

            except Exception as e:
                print(f"Error saving data on {file_path}: {str(e)}")

        else:
            # Do SQL connection
            raise ValueError("SQL Connection is not allowed yet.")

    def _exist_on_db(self, id: int, db) -> bool:
        if self.use_json:
            try:
                existing_data = json.load(db)
                for entry in existing_data:
                    if id == entry["id"]:
                        return True
                return False
            except json.JSONDecodeError:
                print("failed to decode json")
                return True
        else:
            # Do SQL connection
            raise ValueError("SQL Connection is not allowed yet.")

    def find_region(self, query):
        if self.use_json:
            regions: dict = self.get_data("regions.json")  # type: ignore
            for _, value in regions.items():
                if (
                    normalize_text(query.lower()) in value["short_name"].lower()
                    or normalize_text(query.lower()) in value["name"].lower()
                    or normalize_text(query.lower()) in value["id"].lower()
                ):
                    return value
        else:
            # Do SQL connection
            raise ValueError("SQL Connection is not allowed yet.")

    def find_line(self, query: str) -> dict[str, str]:
        if self.use_json:
            lines: list = self.get_data("lines.json")  # type: ignore
            for value in lines:
                if (
                    normalize_text(query.lower()) in value["name"].lower()
                    or normalize_text(query.lower()) in value["id"].lower()
                ):
                    return value
            return {"id": "", "name": ""}
        else:
            # Do SQL connection
            raise ValueError("SQL Connection is not allowed yet.")
