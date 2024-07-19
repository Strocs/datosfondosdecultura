import re
import requests
from unidecode import unidecode


def format_id(string: str) -> str:
    processed_string = string.lower()
    processed_string = unidecode(processed_string)
    processed_string = re.sub(r"[^a-zA-Z0-9 ]", "", processed_string)
    processed_string = re.sub(r"\s+", " ", processed_string).strip()

    if "linea" in processed_string or "inea" in processed_string:
        processed_string = processed_string.replace("linea", "")
        processed_string = processed_string.replace("inea", "")

    return "-".join(processed_string.strip().split(" "))


def normalize_text(string: str) -> str:
    return str(string).replace("\n", " ").strip()


def convert_to_int(value: str) -> int | None:
    try:
        return int(re.sub(r"\D", "", value))
    except ValueError:
        return None


def find_id_in_data(id: int | str, data: list) -> list[bool | int]:
    for index, entry in data:
        if id == entry["id"]:
            return [True, index]
    return [False]


def fetch(url):
    response = requests.get(url)
    response.raise_for_status()
    return response.content


def find_obj_in_list(query: str, list: list | None):

    if list is None:
        return None

    for entry in list:
        if any(
            normalize_text(query.lower()) in str(value).lower()
            for key, value in entry.items()
        ):
            return entry
    print(f"No match was found in {list} with query: {query}")


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
    for data in new_data:
        [exist, index] = find_id_in_data(data["id"], db_data)
        if exist:
            if update:
                db_data[index] = data
        else:
            db_data.append(data)
    return db_data
