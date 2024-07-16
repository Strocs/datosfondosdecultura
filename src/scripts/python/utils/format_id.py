import unidecode


def format_id(string: str) -> str:
    processed_string = string
    if "Línea" in string:
        processed_string = string.replace("Línea", "")
    return unidecode(
        "-".join(processed_string.strip().lower().replace("\n", " ").split(" "))
    )
