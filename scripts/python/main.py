from lib.local_db_manager import LocalDBManager
from lib.pdf_parser import PDFParser
from utils import *

db = LocalDBManager()

pdfs_db, regions_db, projects_db, types_db, lines_db = (
    lambda data: (
        data["pdf"],
        data["regions"],
        data["projects"],
        data["types"],
        data["lines"],
    )
)(db.get_all_data())

args_year = 2024
args_update = True

pdfs = get_data_by_year(args_year, pdfs_db)

for project_type, pdf_urls in pdfs["data"].items():  # type: ignore
    for pdf_url in pdf_urls:
        pdf = fetch(pdf_url)
        data = PDFParser(pdf, project_type, pdfs["year"])  # type: ignore

        projects = add_region_to_projects(data.projects, regions_db)

        projects_db = set_new_data(projects, projects_db, update=args_update)
        types_db = set_new_data(data.type, types_db, update=False)
        lines_db = set_new_data(data.line, lines_db, update=False)


db.insert("projects", projects_db)
db.insert("types", types_db)
db.insert("lines", lines_db)
