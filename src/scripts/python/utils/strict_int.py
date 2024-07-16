import re


def strict_int(value: str) -> int:
    return int(re.sub(r"\D", "", value))
