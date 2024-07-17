import os
import re
import json
from unidecode import unidecode


def exist_on_db(id: int, db) -> bool:

    existing_data = json.load(db)
    for entry in existing_data:
        if id == entry["id"]:
            return True
    return False


def find_region(query: str):
    # get regions from *api* endpoint
    regions: dict = get_data_from_json('regions.json')

    for _, value in regions.items():
        if (
            query.lower() in value["short_name"].lower()
            or query.lower() in value["name"].lower()
            or query.lower() in value["id"].lower()
        ):
            return {
                "id": value["id"],
                "short_name": value["short_name"],
                "name": value["name"],
            }


def format_id(string: str) -> str:
    processed_string = string
    if "Línea" in string:
        processed_string = string.replace("Línea", "")
    
    processed_string = unidecode(processed_string.lower())
    processed_string = re.sub(r'[^a-zA-Z0-9 ]', "", processed_string)
    processed_string = re.sub(r'\s+', ' ', processed_string).strip()
    return "-".join(processed_string.split(" "))
    


def get_data_from_json(file_name: str):
    file_path = get_file_path_from_db(file_name)

    try:
        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        print(f"File {file_path} not found.")
        return {}
    except json.JSONDecodeError:
        print(f"Error decoding JSON file {file_path}.")
        return {}


def get_file_path_from_db(file_name: str) -> str:
    db_path = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "db")
)
    os.makedirs(db_path, exist_ok=True)
    return os.path.abspath(f"{db_path}/{file_name}")


def get_status_and_line_from_row(table: list) -> list[str]:
    [content] = [column.split("-") for column in table if column is not None]

    if len(content) == 1:
        status = "Selección"
        project_line = normalize_title(content[0])
    else:
        status = normalize_title(content[0])
        project_line = normalize_title(content[1])

    return [status, project_line]


def normalize_title(string: str) -> str:
    return string.replace("\n", " ").strip().title()


def save_data_on_json(data: dict, file_name: str) -> None:
    file_path = get_file_path_from_db(file_name)

    try:
        if not os.path.exists(file_path) or os.path.getsize(file_path) == 0:
            with open(file_path, "w", encoding="utf-8") as outfile:
                outfile.write("[\n")
                json.dump(data, outfile, ensure_ascii=False)
                outfile.write("\n]")
            return

        with open(file_path, "r+", encoding="utf-8") as outfile:
            if exist_on_db(data["id"], outfile):
                raise Exception(f"Data with id {data["id"]} already exists on database")

            outfile.seek(0, os.SEEK_END)  # Move the cursor to the end of the file
            outfile.seek(
                outfile.tell() - 1, os.SEEK_SET
            )  # Move the cursor to the position just before the last character

            if outfile.read(1) == "]":
                outfile.seek(-1, os.SEEK_END)
                outfile.write(",\n")
                json.dump(data, outfile, ensure_ascii=False)
                outfile.write("\n]")
            else:
                outfile.seek(0, os.SEEK_END)
                outfile.write(",\n")
                json.dump(data, outfile, ensure_ascii=False)
                outfile.write("\n]")

    except Exception as e:
        print(f"Error saving data on {file_path}: {str(e)}")


def strict_int(value: str) -> int:
    return int(re.sub(r"\D", "", value))
