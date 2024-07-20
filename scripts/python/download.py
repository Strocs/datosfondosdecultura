from lib.local_db_manager import LocalDBManager
from utils import *
import json

# TODO: verify if files already exists
# TODO: generate utils for get paths

args_year = 2024

db = LocalDBManager()

pdfs_db = db.get("pdf")

pdfs = get_data_by_year(args_year, pdfs_db["data"])

local_pdf_data = {}

for project_type, pdf_urls in pdfs["data"].items():  # type: ignore
    local_pdf_data.setdefault(project_type, [])
    for index, pdf_url in enumerate(pdf_urls):

        pdf = fetch(pdf_url)

        local_pdf_name = f"{index}_{project_type}_{pdfs['year']}.pdf"  # type: ignore

        file_path = save_pdf_on_local(pdf, local_pdf_name)

        local_pdf_data[project_type].append(file_path)


def generate_local_pdfs_db():
    file_path = base_path("tmp", "db", file="pdf.json")

    data = {"data": [{"year": args_year, "data": local_pdf_data}]}

    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)


generate_local_pdfs_db()
