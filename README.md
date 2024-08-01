```
<!-- Working in local with Turso DB -->
turso dev --db-file local.db
<!-- Migrate DB -->
pnpm run prisma:migrate
<!-- Seed remote DB that sync with embedded replica -->
pnpm run prisma:seed
<!-- Apply migrate to remote Turso DB -->
turso db shell <turso-db-name> < ./prisma/migrations/<migration-hash>/migration.sql
```

# TODO

### DB
- [x] Change region reference db
- [x] Update projects db with new region data
- [x] Get pdf links and process new type data
- [x] Update databases with new project, lines and type data
- [ ] Scrape others found types pdfs for 2024, process, and add to DB
- [x] Migrate DB to any SQL Database (turso with libsql)
- [x] Implement a script to upload remote DB
- [x] Implement Turso Embedded Replica 
---

### API
- [x] Validate data from DB with schemas
- [ ] Cache responses with Vercel KV
--- 

### APP
- [x] Get Reference Data from DB *(Evaluate)*
- [x] Implement schemas to validate data
- [?] Fetch and cache on server, Region, Type and Lines datas from db to create filters 
- [x] Create faceted filters for Region, Type and Lines
- [ ] Create Landing Page

<br>
<br>
<br>

# NOTES 

### Estructura

#### MVP (Sólo 2024)

- ### **/**
  - *[LineChart]* Gasto total por año
  - *[LineChart]* Cantidad de proyectos seleccionados por año
  - *[OverlappedLineChart]* Cantidad de proyectos por región en función al año.
  - *[OverlappedLineChart]* Montos asignados por región en función al año. *(Permite visualizar cuánto a crecido una región respecto a otra(s) a lo largo de los años)*

  > En los diagramas por año, permitir seleccionar rango de años. <br>
  > En los diagramas por región permitir ocultar regiones.

- ### **/proyectos**
  - Tabla de proyectos
    - Filtrar por región / tipo / línea / estado

  - Generar dinámicamente charts asociados a los filtros
    - General:
      - *[Info]* Monto total
      - *[Info]* Cantidad de Proyectos
    - Fondo:
      - *[StackedBarChart]* Cantidad de Proyectos
      - *[StackedBarChart]* Monto total
    - Región:
      - *[StackedBarChart]* Cantidad de Proyectos
      - *[StackedBarChart]* Monto total
      - *[StackedBarChart]* Tipo de Fondo
      - *[StackedMultipleBarChart]* Líneas *(Sólo si se filtra Fondos y/o línea)*
    - Línea: *(Sólo si se filtra Fondos)*
      - [StackedBarChart] Cantidad de Proyectos
      - [StackedBarChart] Monto total

  - Descargar informe

- ### **/**
  - *[LineChart]* Gasto total por año
  - *[LineChart]* Cantidad de proyectos seleccionados por año
  - *[OverlappedLineChart]* Cantidad de proyectos por región en función al año.
  - *[OverlappedLineChart]* Montos asignados por región en función al año. *(Permite visualizar cuánto a crecido una región respecto a otra(s) a lo largo de los años)*

  > En los diagramas por año, permitir seleccionar rango de años. <br>
  > En los diagramas por región permitir ocultar regiones.

- ### **/[year]/proyectos**
  - Tabla de proyectos
    - Filtrar por región / tipo / línea / estado

  - Generar dinámicamente charts asociados a los filtros
    - General:
      - *[Info]* Monto total
      - *[Info]* Cantidad de Proyectos
    - Fondo:
      - *[StackedBarChart]* Cantidad de Proyectos
      - *[StackedBarChart]* Monto total
    - Región:
      - *[StackedBarChart]* Cantidad de Proyectos
      - *[StackedBarChart]* Monto total
      - *[StackedBarChart]* Tipo de Fondo
      - *[StackedMultipleBarChart]* Líneas *(Sólo si se filtra Fondos y/o línea)*
    - Línea: *(Sólo si se filtra Fondos)*
      - [StackedBarChart] Cantidad de Proyectos
      - [StackedBarChart] Monto total

  - Descargar informe