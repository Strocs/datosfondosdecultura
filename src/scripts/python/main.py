import json
import pymupdf
import io
import os
import requests
from utils import *

current_year = 2024

db_path = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "db", "pdf-url")
)

with open(f"{db_path}/{current_year}.json", "r", encoding="utf-8") as url_pdf_file:
    pdf_file = json.load(url_pdf_file)
    PROJECT_YEAR = pdf_file["year"]

    for PROJECT_TYPE in pdf_file["data"]:
        TYPE = {"id": format_id(PROJECT_TYPE), "name": PROJECT_TYPE}
        save_data_on_json(TYPE, "types.json")

        pdf_url_list = pdf_file["data"][PROJECT_TYPE]

        for pdf_url in pdf_url_list:
            response = requests.get(pdf_url)
            response.raise_for_status()

            DOC = pymupdf.open(stream=io.BytesIO(response.content), filetype="pdf")

            project_line = {"id": "", "name": ""}
            project_status = ""

            for page in DOC:
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
                                [status, line] = get_status_and_line_from_row(table[0])

                                # Save in main scope status and project line
                                project_line = {
                                    "id": format_id(line),
                                    "name": line,
                                }
                                project_status = status

                                save_data_on_json(project_line, "lines.json")
                                continue

                            # avoid first column if row have 7 columns
                            try:
                                [_, region, folio, modality, title, owner, amount] = row
                            except ValueError:
                                [region, folio, modality, title, owner, amount] = row

                            save_data_on_json(
                                {
                                    "id": strict_int(folio),
                                    "region": find_region(region),
                                    "year": PROJECT_YEAR,
                                    "folio": strict_int(folio),
                                    "line": {
                                        **project_line,
                                        "modality": normalize_title(modality),
                                    },
                                    "projectName": normalize_title(title),
                                    "projectOwner": normalize_title(owner),
                                    "amountAssigned": strict_int(amount),
                                    "status": project_status,
                                    "type": TYPE,
                                },
                                "projects.json",
                            )
