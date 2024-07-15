import json
import re
from unidecode import unidecode
import os


def normalize_title(string: str) -> str:
    return string.replace("\n", " ").strip().title()


def get_status_and_line_from_row(table: list) -> list[str]:
    [content] = [column.split("-") for column in table if column is not None]

    if len(content) == 1:
        status = "Selección"
        project_line = normalize_title(content[0])
    else:
        status = normalize_title(content[0])
        project_line = normalize_title(content[1])

    return [status, project_line]


def format_id(string: str) -> str:
    processed_string = string
    if "Línea" in string:
        processed_string = string.replace("Línea", "")
    return unidecode(
        "-".join(processed_string.strip().lower().replace("\n", " ").split(" "))
    )


def add_obj_to_list(list: list, item: object) -> None:
    # if is empty, add item
    if not list:
        list.append(item)
        return
    # if item exists in list do nothing
    for list_item in list:
        if list_item == item:
            return
    # add item to list
    list.append(item)


def format_amount(amount: str) -> int:
    try:
        return int(amount.replace(".", "").replace("$", ""))
    except ValueError:
        return 0


def save_data_on_json(data: list, file_name: str) -> None:
    db_path = os.path.abspath("../db/")
    os.makedirs(db_path, exist_ok=True)

    file_path = os.path.abspath(f"{db_path}/{file_name}")

    def save_data(entry):
        # save data if doest not exist
        json.dump(entry, outfile, ensure_ascii=False)

    try:
        if not os.path.exists(file_path) or os.path.getsize(file_path) == 0:
            with open(file_path, "w", encoding="utf-8") as outfile:
                outfile.write("[\n")
                save_data(data)
                outfile.write("\n]")
            print(f"Data saved on {file_path}")
            return

        with open(file_path, "r+", encoding="utf-8") as outfile:

            # existing_data = json.load(outfile)
            # for entry in existing_data:
            #     if entry.get("id") == data.get("id"):
            #         print(f"Data with ID {data.get('id')} already exists.")
            #         return

            outfile.seek(0, os.SEEK_END)  # Move the cursor to the end of the file
            outfile.seek(
                outfile.tell() - 1, os.SEEK_SET
            )  # Move the cursor to the position just before the last character

            if outfile.read(1) == "]":
                outfile.seek(-1, os.SEEK_END)
                outfile.write(",\n")
                save_data(data)
                outfile.write("\n]")
            else:
                outfile.seek(0, os.SEEK_END)
                outfile.write(",\n")
                save_data(data)
                outfile.write("\n]")

            save_data(data)
            outfile.write("\n]")

        print(f"Data saved on {file_path}")
    except Exception as e:
        print(f"Error saving data on {file_path}: {str(e)}")


def strict_int(value: str) -> int:
    return int(re.sub(r"\D", "", value))


def find_region(query: str):
    # get regions from *api* endpoint
    # db_path = os.path.abspath('../db')
    regionsJson = open("../db/regions.json", encoding="utf-8")
    regions = json.load(regionsJson)

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
