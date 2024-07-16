from scripts.python.utils import normalize_title


def get_status_and_line_from_row(table: list) -> list[str]:
    [content] = [column.split("-") for column in table if column is not None]

    if len(content) == 1:
        status = "Selección"
        project_line = normalize_title(content[0])
    else:
        status = normalize_title(content[0])
        project_line = normalize_title(content[1])

    return [status, project_line]
