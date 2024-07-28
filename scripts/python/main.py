from lib.local_db_manager import LocalDBManager
from lib.pdf_parser import PDFParser
from lib.utils import *

args_year = 2024
args_update = True
local_work = True

db = LocalDBManager()

pdfs_db, regions_db, projects_db, funds_db, lines_db = (
    lambda data: (
        data["pdf"],
        data["regions"],
        data["projects"],
        data["funds"],
        data["lines"],
    )
)(db.get_all_data())


if local_work:
    pdfs_db = get_pdfs_data_from_local()["data"]

pdfs = get_data_by_year(args_year, pdfs_db)

for project_type, pdf_urls in pdfs["data"].items():  # type: ignore
    for index, pdf_url in enumerate(pdf_urls):

        pdf = fetch(pdf_url, local=local_work)
        # save_pdf_on_local(pdf, f"{index}_{project_type}_{pdfs['year']}.pdf")  # type: ignore

        data = PDFParser(pdf, project_type, pdfs["year"]).results()  # type: ignore

        projects = add_region_to_projects(data["projects"], regions_db)

        projects_db = set_new_data(projects, projects_db, update=args_update)
        funds_db = set_new_data(data["funds"], funds_db, update=False)
        lines_db = set_new_data(data["lines"], lines_db, update=False)

db.insert("projects", projects_db)
db.insert("funds", funds_db)
db.insert("lines", lines_db)
