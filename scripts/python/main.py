import json
import pymupdf
import io
import os
import requests
from lib.db_manager import DBManager
from utils import *

current_year = 2024

db = DBManager(use_json=True)
db.connect()

links_path = os.path.join(db._path, f"{current_year}.json")


# args[1] -> <year>: search for year file in db/links
# args[2] -> <file>: "types", "lines", "projects" -> if none -> all: fetch data from current pdf links and append if new value does'nt exist in db file
# flag -> --update: compare by id all attributes, update if any attribute is changed and if new value not null

# 1. get file and/or year from args
# 2. connect to db
# 3. get links from db
#   - from local json
#   - from sql db
# 4. process data
#   - evaluate what is saved on db. ex: if args.files == 'all', then three db will be appended with data

with open(links_path, "r", encoding="utf-8") as pdf_urls_file:
    pdf_data = json.load(pdf_urls_file)
    project_year = pdf_data["year"]

    for project_type in pdf_data["data"]:
        type = {"id": format_id(project_type), "name": project_type}
        # db.save_data(type, "types.json")

        pdf_urls = pdf_data["data"][project_type]

        for pdf_url in pdf_urls:
            response = requests.get(pdf_url)
            response.raise_for_status()

            document = pymupdf.open(stream=io.BytesIO(response.content), filetype="pdf")

            current_project_line = {"id": "", "name": ""}
            current_status = ""

            for page in document:
                tables = page.find_tables().tables  # type: ignore

                if len(tables) > 0:  # avoid pages without tables

                    for table in tables:
                        table = table.extract()

                        # Remove row with titles of columns
                        if len(table) > 1 and any(
                            section == "FOLIO" for section in table[1]
                        ):
                            table.pop(1)

                        for row in table:

                            # If the first row have at least one None value, is head row with status and project line
                            if None in row:
                                [status, line] = extract_status_and_line(table[0])

                                # Save in main scope status and project line
                                current_project_line = db.find(line, "lines")
                                # current_project_line = {
                                #     "id": format_id(line),
                                #     "name": line,
                                # }
                                current_status = status
                                # db.save_data(current_project_line, "lines.json")
                                continue

                            # avoid first column if row have 7 columns
                            try:
                                [_, region, folio, modality, title, owner, amount] = row
                            except ValueError:
                                [region, folio, modality, title, owner, amount] = row

                            new_project = (
                                {
                                    "id": convert_to_int(folio),
                                    "region": db.find(region, "regions"),
                                    "year": project_year,
                                    "folio": convert_to_int(folio),
                                    "line": {
                                        **current_project_line,  # type: ignore
                                        "modality": normalize_text(modality),
                                    },
                                    "projectName": normalize_text(title),
                                    "projectOwner": normalize_text(owner),
                                    "amountAssigned": convert_to_int(amount),
                                    "status": current_status,
                                    "type": type,
                                },
                            )

                            # db.save_data(
                            #     "projects",
                            #     new_project
                            # )

            print(f"Finished pdf: {pdf_url} - {project_type}")
