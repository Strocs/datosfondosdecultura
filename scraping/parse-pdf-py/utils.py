import json
from unidecode import unidecode

def normalize_title (string):
  return string.replace("\n", " ").strip().title()

def get_status_and_line_from_row (table):
  [content] = [column.split('-') for column in table if column is not None]
  status = normalize_title(content[0])
  project_line = normalize_title(content[1])
  return [status, project_line]

def format_id (string: str) -> str:
  processed_string = string
  if 'Línea' in string:
    processed_string = string.replace('Línea', '')
  return unidecode('-'.join(processed_string.strip().lower().replace("\n", " ").split(' ')))

def add_obj_to_list (list, item):
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

def format_amount (amount):
  return int(amount.replace('.', '').replace('$', ''))

def save_data_on_json (data, file_name):
  with open(file_name, 'w', encoding='utf-8') as outfile:
    json.dump(data, outfile, indent=2, ensure_ascii=False)
  print (f"Data saved on {file_name}")
