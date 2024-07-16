import json


def find_region(query: str):
    # get regions from *api* endpoint
    # db_path = os.path.abspath('../db')
    regionsJson = open("../db/regions.json", encoding="utf-8")
    regions = json.load(regionsJson)

    for _, value in regions.items():
        if (
            query.lower() in value["short_name"].lower()
            or query.lower() in value["name"].lower()
            or query.lower() in value["id"].lower()
        ):
            return {
                "id": value["id"],
                "short_name": value["short_name"],
                "name": value["name"],
            }
