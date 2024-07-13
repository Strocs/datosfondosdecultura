import pymupdf

from utils import format_id, add_obj_to_list, format_amount, normalize_title, save_data_on_json, get_status_and_line_from_row

doc = pymupdf.open("../scrap-pdf-node/test.pdf")

# number_of_pages = len(doc)
number_of_pages = 4

projects_type = doc[0].get_text().strip().split('\n')[-1]

type_list = [
  {
    "id": format_id(projects_type),
    "name": projects_type
  },
]
line_list = []
project_list = []
region_list = []

for page_number in range(number_of_pages):

  tables = doc[page_number].find_tables().tables

  # avoid pages without tables
  if len(tables) > 0:
  
    line = {"id": "", "name": ""}
    t_status = ""
    for table in tables:
      table = table.extract()

      if None in table[0]:
        [status, project_line] = get_status_and_line_from_row(table[0])
        line = {
          "id": format_id(project_line),
          "name": project_line,
        }
        t_status = status

        add_obj_to_list(line_list, line)
      
      if table[1][0] == 'Nº':
        table.pop(1)
        
      for row in table[1:]:
        [order, region, folio, modality, title, owner, amount] = row

        add_obj_to_list(project_list, {
            "id": int(folio),
            "order": int(order),
            "region": normalize_title(region),
            "year": 2024,
            "folio": int(folio),
            "line": {**line, "modality": normalize_title(modality)},
            "projectName": normalize_title(title),
            "projectOwner": normalize_title(owner),
            "amountAllocated": format_amount(amount),
            "status": t_status,
            "type": type_list[0]
        })
       
        add_obj_to_list(region_list, {
          "id": format_id(region),
          "name": normalize_title(region),
        })


save_data_on_json(project_list, './db/projects.json')
save_data_on_json(line_list, './db/lines.json')
save_data_on_json(region_list, './db/regions.json')
save_data_on_json(type_list, './db/types.json')








# Datos de Referencia
# {
#   "types": [
#     {
#       "id": "fondart_regional",
#       "name": "Fondart Regional"
#     },
#     {
#       "id": "fondart_nacional",
#       "name": "Fondart Nacional"
#     }
#   ],
#   "regions": [
#     {
#       "id": "metropolitana",
#       "name": "Metropolitana"
#     },
#     {
#       "id": "coquimbo",
#       "name": "Coquimbo"
#     }
#   ],
#   "lines": [
#     {
#       "id": "cultura_regional",
#       "name": "Línea de Culturas Regionales"
#     },
#     {
#       "id": "actividades_formativas",
#       "name": "Línea de Actividades Formativas"
#     },
#     {
#       "id": "difusion",
#       "name": "Línea de Difusión"
#     }
#   ]
# }

# Endpoints y Estructura
# Endpoint Principal: /projects
# GET /projects
# [

#   {
#     "id": 2,
#     "order": 124,
#     "region": "Coquimbo",
#     "year": 2024,
#     "folio": 4568,
#     "line": {
#       "id": "cultura_regional",
#       "name": "Línea de Culturas Regionales",
#       "modalidad": "Única"
#     },
#     "projectName": "Proyecto B",
#     "projectOwner": "María Gómez",
#     "amountAllocated": 60000,
#     "status": "Lista de espera",
#     "type": {
#       "id": "fondart_regional",
#       "name": "Fondart Regional"
#     }
#   }
# ]