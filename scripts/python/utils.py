import re
from unidecode import unidecode


def format_id(string: str) -> str:
    processed_string = string.lower()
    processed_string = unidecode(processed_string)
    processed_string = re.sub(r"[^a-zA-Z0-9 ]", "", processed_string)
    processed_string = re.sub(r"\s+", " ", processed_string).strip()

    if "linea" in processed_string or "inea" in processed_string:
        processed_string = processed_string.replace("linea", "")
        processed_string = processed_string.replace("inea", "")

    return "-".join(processed_string.strip().split(" "))


def extract_status_and_line(row: list) -> list[str]:
    """Extract the status and project line from the given input row."""
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


def normalize_text(string: str) -> str:
    return str(string).replace("\n", " ").strip()


def convert_to_int(value: str) -> int | None:
    try:
        return int(re.sub(r"\D", "", value))
    except ValueError:
        return None


def find_id_in_data(id: int, data: list) -> bool:
    for entry in data:
        if id == entry["id"]:
            return True
    return False
