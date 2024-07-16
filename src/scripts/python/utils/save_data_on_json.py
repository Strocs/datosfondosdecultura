import json
import os
from scripts.python.utils import get_file_path_from_db


def save_data_on_json(data: list, file_name: str) -> None:
    file_path = get_file_path_from_db(file_name)

    try:
        if not os.path.exists(file_path) or os.path.getsize(file_path) == 0:
            with open(file_path, "w", encoding="utf-8") as outfile:
                outfile.write("[\n")
                json.dump(data, outfile, ensure_ascii=False)
                outfile.write("\n]")
            print(f"Data saved on {file_path}")
            return

        with open(file_path, "r+", encoding="utf-8") as outfile:

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

        print(f"Data saved on {file_path}")
    except Exception as e:
        print(f"Error saving data on {file_path}: {str(e)}")
