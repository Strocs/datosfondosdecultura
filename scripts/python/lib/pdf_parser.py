import io
import pymupdf

from lib.utils import (
    convert_to_int,
    find_id_in_data,
    format_id,
    normalize_text,
)


class PDFParser:
    def __init__(self, file, type, year):
        self.line = []
        self.status = ""
        self.projects = []
        self.fund = [{"fund_id": format_id(type), "fund_name": type}]
        self.year = year
        self.__pdf = None
        self.__file = file
        self.__current_line = {"line_id": "", "line_name": ""}
        self.__extract()
        self.__parse()

    def results(self):
        return {
            "lines": self.line,
            "status": self.status,
            "projects": self.projects,
            "funds": self.fund,
            "year": self.year,
        }

    def __parse(self):
        for page in self.__pdf:  # type: ignore
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
                            [status, line] = self.__extract_status_and_line(table[0])

                            line_id = format_id(line)

                            self.__current_line = {
                                "line_id": line_id,
                                "line_name": line,
                            }

                            if not find_id_in_data(line_id, self.line)[0]:
                                self.__set_line(self.__current_line)

                            if status != self.status:
                                self.__set_status(status)
                            continue

                        # avoid first column if row have 7 columns
                        try:
                            [_, region, folio, modality, title, owner, amount] = row
                        except ValueError:
                            [region, folio, modality, title, owner, amount] = row

                        self.__set_project(
                            {
                                "project_id": convert_to_int(folio),
                                "project_name": normalize_text(title),
                                "project_owner": normalize_text(owner),
                                "fund_id": self.fund[0]["fund_id"],
                                "project_year": self.year,
                                "region_id": region,
                                "line_id": self.__current_line["line_id"],
                                "modality": normalize_text(modality),
                                "status": self.status,
                                "amount_assigned": convert_to_int(amount),
                            },
                        )

    def __extract_status_and_line(self, row):
        content = row[0]  # Get the first element of the input list
        normalized_content = normalize_text(content)  # Normalize the text

        status_content = [
            "Selección",
            "Seleccionados",
            "Lista de Espera",
        ]  # Define the status keywords we are looking for

        if status_content[2].lower() in normalized_content.lower():
            status = status_content[2]
        else:
            status = status_content[0]

        parts = [part.strip() for part in normalized_content.split("-")]

        for part in parts:
            if part.lower() in [status.lower() for status in status_content]:
                parts.remove(part)

        try:
            project_line = [
                parts[0].lower().replace(status.lower(), "").strip()
                for status in status_content
                if status.lower() in parts[0].lower()
            ][0]
        except IndexError:
            project_line = parts[0]

        if "grupo" in project_line.lower():
            project_line = project_line.lower().split("grupo")[0].strip()

        # Return the status and project line in the desired format
        return [status, normalize_text(project_line).title()]

    def __extract(self):
        self.__pdf = pymupdf.open(stream=io.BytesIO(self.__file), filetype="pdf")
        return self.__pdf

    def __set_line(self, line: dict[str, str]):
        self.line = [*self.line, line]

    def __set_status(self, status):
        self.status = status

    def __set_project(self, project):
        self.projects = [*self.projects, project]
