def format_amount(amount: str) -> int:
    try:
        return int(amount.replace(".", "").replace("$", ""))
    except ValueError:
        return 0
