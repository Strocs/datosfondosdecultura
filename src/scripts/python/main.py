import json
import pymupdf
import sys
import io
import os
from utils import *

# TODO: Read db pdf-url file for current year
# TODO: Get year -> loop by type -> loop by link -> save on db

current_year = 2024
db_path = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "db", "pdf-url")
)

with open(f"{db_path}/{current_year}.json", "r", encoding="utf-8") as pdfFile:
    doc = json.load(pdfFile)
    PROJECT_YEAR = doc["year"]


# DOC = pymupdf.open(stream=io.BytesIO(PDF), filetype="pdf")

# NUMBER_OF_PAGES = len(DOC)

# PROJECT_TYPE = "Fondart " + sys.argv[1]

# type_list = [
#     {"id": format_id(PROJECT_TYPE), "name": PROJECT_TYPE},
# ]

# line_list = []
# project_list = []

# line = {"id": "", "name": ""}
# t_status = ""

# for page_number in range(NUMBER_OF_PAGES):

#     tables = DOC[page_number].find_tables().tables  # type: ignore

#     # avoid pages without tables
#     if len(tables) > 0:

#         for table in tables:
#             table = table.extract()

#             # Remove row with titles of columns
#             if len(table) > 1 and any(section == "FOLIO" for section in table[1]):
#                 table.pop(1)

#             for row in table:

#                 # If the first row have at least one None value, is head row with status and project line
#                 if None in row:
#                     [status, project_line] = get_status_and_line_from_row(table[0])

#                     # Save in main scope status and project line
#                     line = {
#                         "id": format_id(project_line),
#                         "name": project_line,
#                     }
#                     t_status = status

#                     add_obj_to_list(line_list, line)
#                     continue

#                 try:
#                     [_, region, folio, modality, title, owner, amount] = row
#                 except ValueError:
#                     [region, folio, modality, title, owner, amount] = row

#                 add_obj_to_list(
#                     project_list,
#                     {
#                         "id": strict_int(folio),
#                         "region": find_region(region),
#                         "year": PROJECT_YEAR,
#                         "folio": strict_int(folio),
#                         "line": {**line, "modality": normalize_title(modality)},
#                         "projectName": normalize_title(title),
#                         "projectOwner": normalize_title(owner),
#                         "amountAssigned": format_amount(amount),
#                         "status": t_status,
#                         "type": type_list[0],
#                     },
#                 )


# DOC.close()

# save_data_on_json(project_list, "projects.json")
# save_data_on_json(line_list, "lines.json")
# save_data_on_json(type_list, "types.json")
