from lib.local_db_manager import LocalDBManager
from utils import *

args_year = 2024
local_work = True

db = LocalDBManager()

pdfs_db = db.get("pdf")

if local_work:
    pdfs_db = get_pdfs_data_from_local()["data"]

pdfs = get_data_by_year(args_year, pdfs_db)

for project_type, pdf_urls in pdfs["data"].items():  # type: ignore
    for index, pdf_url in enumerate(pdf_urls):

        pdf = fetch(pdf_url, local=local_work)

        save_pdf_on_local(pdf, f"{index}_{project_type}_{pdfs['year']}.pdf")  # type: ignore
