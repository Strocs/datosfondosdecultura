import re
from unidecode import unidecode


def flatten_text(string: str) -> str:
    processed_string = string.lower()
    processed_string = unidecode(processed_string)
    processed_string = re.sub(r"[^a-zA-Z0-9 ]", "", processed_string)
    processed_string = re.sub(r"\s+", " ", processed_string).strip()
    return processed_string


def find_obj_in_list(query: str, list: list | None):
    if list is None:
        return None

    flattened_query = flatten_text(query)
    print(f"Flattened query: {flattened_query}, {query}")

    for entry in list:
        for key, value in entry.items():
            flattened_value = flatten_text(str(value))
            print(f"Flattened value for key '{key}': {flattened_value}")
            if flattened_query in flattened_value:
                return entry

    print(f"No match was found with query: {query}")
    return None


list = [
    {
        "id": "CL-AP",
        "name": "Región de Arica y Parinacota",
        "shortName": "Arica y Parinacota",
        "abbr": "Arica",
    },
]

query = "Arica y Parinacota"

result = find_obj_in_list(query, list)
print(result)
