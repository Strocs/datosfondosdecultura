# Starting project

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

## DB

- [x] Change region reference db
- [x] Update projects db with new region data
- [x] Get pdf links and process new type data
- [x] Update databases with new project, lines and type data
- [ ] Scrape others found types pdfs for 2024, process, and add to DB
- [x] Migrate DB to any SQL Database (turso with libsql)
- [x] Implement a script to upload remote DB
- [x] Implement Turso Embedded Replica

---

## API

- [x] Validate data from DB with schemas
- [ ] Cache responses with Vercel KV
- [ ] Work with local db and avoid cache data in development

---

## APP

- [x] Get Reference Data from DB _(Evaluate)_
- [x] Implement schemas to validate data
- [?] Fetch and cache on server, Region, Type and Lines datas from db to create filters
- [x] Create faceted filters for Region, Type and Lines
- [ ] Create Landing Page

<br>
<br>
<br>

# NOTES

## Estructura

### MVP (Sólo 2024)

#### **/**

- _[LineChart]_ Gasto total por año
- _[LineChart]_ Cantidad de proyectos seleccionados por año
- _[OverlappedLineChart]_ Cantidad de proyectos por región en función al año.
- _[OverlappedLineChart]_ Montos asignados por región en función al año. _(Permite visualizar cuánto a crecido una región respecto a otra(s) a lo largo de los años)_

> En los diagramas por año, permitir seleccionar rango de años.
> En los diagramas por región permitir ocultar regiones.

#### **/proyectos**

- Tabla de proyectos

  - Filtrar por región / tipo / línea / estado

- Generar dinámicamente charts asociados a los filtros

  - General:
    - _[Info]_ Monto total
    - _[Info]_ Cantidad de Proyectos
  - Fondo:
    - _[StackedBarChart]_ Cantidad de Proyectos
    - _[StackedBarChart]_ Monto total
  - Región:
    - _[StackedBarChart]_ Cantidad de Proyectos
    - _[StackedBarChart]_ Monto total
    - _[StackedBarChart]_ Tipo de Fondo
    - _[StackedMultipleBarChart]_ Líneas _(Sólo si se filtra Fondos y/o línea)_
  - Línea: _(Sólo si se filtra Fondos)_
    - [StackedBarChart] Cantidad de Proyectos
    - [StackedBarChart] Monto total

- Descargar informe

---

### Expected

#### **/home**

- _[LineChart]_ Gasto total por año
- _[LineChart]_ Cantidad de proyectos seleccionados por año
- _[OverlappedLineChart]_ Cantidad de proyectos por región en función al año.
- _[OverlappedLineChart]_ Montos asignados por región en función al año. _(Permite visualizar cuánto a crecido una región respecto a otra(s) a lo largo de los años)_

> En los diagramas por año, permitir seleccionar rango de años.
> En los diagramas por región permitir ocultar regiones.

#### **/[year]/proyectos**

- Tabla de proyectos

  - Filtrar por región / tipo / línea / estado

- Generar dinámicamente charts asociados a los filtros

  - General:
    - _[Info]_ Monto total
    - _[Info]_ Cantidad de Proyectos
  - Fondo:
    - _[StackedBarChart]_ Cantidad de Proyectos
    - _[StackedBarChart]_ Monto total
  - Región:
    - _[StackedBarChart]_ Cantidad de Proyectos
    - _[StackedBarChart]_ Monto total
    - _[StackedBarChart]_ Tipo de Fondo
    - _[StackedMultipleBarChart]_ Líneas _(Sólo si se filtra Fondos y/o línea)_
  - Línea: _(Sólo si se filtra Fondos)_
    - [StackedBarChart] Cantidad de Proyectos
    - [StackedBarChart] Monto total

- Descargar informe
