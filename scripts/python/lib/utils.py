import json
import re
import requests
from unidecode import unidecode
import os


def format_id(string: str) -> str:
    processed_string = flatten_text(string)

    if "linea" in processed_string or "inea" in processed_string:
        processed_string = processed_string.replace("linea", "")
        processed_string = processed_string.replace("inea", "")

    return "-".join(processed_string.strip().split(" "))


def normalize_text(string: str) -> str:
    return str(string).replace("\n", " ").strip()


def flatten_text(string: str) -> str:
    processed_string = string.lower()
    processed_string = unidecode(processed_string)
    processed_string = re.sub(r"[^a-zA-Z0-9 ]", "", processed_string)
    processed_string = re.sub(r"\s+", " ", processed_string).strip()
    return processed_string


def convert_to_int(value: str) -> int | None:
    try:
        return int(re.sub(r"\D", "", value))
    except ValueError:
        return None


def find_id_in_data(id: int | str, data: list) -> list[bool | int | None]:
    for index, entry in enumerate(data):
        if id == entry["id"]:
            return [True, index]
    return [False, None]


def fetch(url, local=False):
    if not local:
        response = requests.get(url)
        response.raise_for_status()
        return response.content
    else:

        with open(url, "rb") as local_pdf_file:
            return local_pdf_file.read()


def find_obj_in_list(query: str, list: list | None):
    if list is None:
        return None

    for entry in list:
        if any(
            flatten_text(normalize_text(query)) in flatten_text(str(value))
            for key, value in entry.items()
        ):
            return entry

    print(f"No match was found with query: {query}")


def get_data_by_year(year, list):
    for item in list:
        if item["year"] == year:
            return item


def add_region_to_projects(projects, regions):
    updated_projects = []
    for project in projects:
        updated_projects.append(
            {
                **project,
                "region": find_obj_in_list(project["region"], regions),
            }
        )
    return updated_projects


def set_new_data(new_data, db_data, update=True):
    if len(db_data) > 0:
        for data in new_data:
            [exist, index] = find_id_in_data(data["id"], db_data)
            if exist:
                if update:
                    db_data[index] = data
            else:
                db_data.append(data)
    else:
        db_data = new_data
    return db_data


def save_pdf_on_local(pdf, name):
    try:
        print(f"...downloading {name}")

        path = base_path("tmp", "db")

        file_path = os.path.join(path, f"{name}")

        with open(file_path, "wb") as f:
            f.write(pdf)
        print(f"PDF saved successfully: {file_path}")
        return file_path
    except Exception as e:
        print(f"Error saving PDF: {e}")


def get_pdfs_data_from_local():
    path = base_path("tmp", "db")
    file_path = os.path.join(path, "pdf.json")

    try:
        with open(file_path, "r", encoding="utf-8") as local_pdf_file:
            local_pdf_data = json.load(local_pdf_file)
        return local_pdf_data
    except FileNotFoundError:
        print(
            "Local folder not found, you need to download data first using: `npm run pdf:download`"
        )
        return {}


def base_path(*args, file=None):
    path = os.path.abspath(os.path.join(os.getcwd(), *args))
    if not os.path.exists(path):
        os.makedirs(path)
    if file != None:
        path = os.path.join(path, file)

    return path
