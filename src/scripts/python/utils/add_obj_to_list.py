def add_obj_to_list(list: list, item: object) -> None:
    # if is empty, add item
    if not list:
        list.append(item)
        return
    # if item exists in list do nothing
    for list_item in list:
        if list_item == item:
            return
    # add item to list
    list.append(item)
