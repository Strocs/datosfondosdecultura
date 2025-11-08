# Estrategia y Visión del Producto: Visualizador de Fondos de Cultura

*Este documento fue generado por un agente de IA experto en ciencia de datos para guiar el desarrollo y la visión del proyecto.*

## 1. Visión del Producto de Datos: El "Porqué"

El objetivo no es solo "mostrar datos", es **transformar datos crudos en conocimiento accionable**. Queremos que un usuario pueda responder preguntas complejas de forma intuitiva. Preguntas como:

*   *¿Está aumentando o disminuyendo la inversión en cultura en mi región?*
*   *¿Qué tipo de proyectos (líneas) reciben más financiamiento?*
*   *¿Cómo se compara la inversión en mi comuna/región con la del resto del país?*
*   *Si quiero postular a un fondo, ¿qué líneas han sido históricamente más financiadas?*

**Nuestro rol es guiar al usuario en un viaje**, desde una vista panorámica nacional hasta el detalle de un proyecto específico que le interese.

## 2. Entendiendo al Usuario Final

Debemos diseñar para arquetipos de usuario clave:

1.  **El Ciudadano / Periodista:** Busca transparencia y titulares. Necesita vistas de alto nivel, comparativas y fáciles de compartir. Le interesan los totales, las tendencias y las desigualdades regionales.
2.  **El Gestor Cultural / Postulante:** Es un usuario avanzado. Busca oportunidades. Necesita poder filtrar con granularidad para entender qué fondos, líneas y regiones tienen mayor actividad y financiamiento.
3.  **El Analista / Funcionario Público:** Necesita datos para la toma de decisiones. Requiere la capacidad de descargar datos crudos, ver tendencias históricas y cruzar múltiples variables para generar informes.

## 3. La Narrativa de los Datos: El "Qué" y el "Dónde"

Se propone una estructura de dos niveles que se alinea con las mejores prácticas de UX para dashboards.

(El resto de la sección de estrategia permanece igual...)

---

# Plan de Desarrollo y Roadmap

Este es el plan de acción priorizado para construir el producto de acuerdo a la estrategia definida. 

### Fase 0: Refactorización Crítica de Fundamentos (Acción Inmediata)
*Objetivo: Corregir la arquitectura de datos para asegurar el rendimiento y adoptar un mindset de "base de datos primero".*

- [ ] **Modificar `projectService.ts`:** Actualizar la función `getProjects` para que acepte un objeto de filtros (ej. `{ region, year, fund }`).
- [ ] **Implementar Filtrado en el Backend:** Usar los filtros para construir una cláusula `where` en la consulta de Prisma. Dejar de traer toda la base de datos al servidor.
- [ ] **Crear Servicios de Agregación:** Añadir nuevas funciones en `projectService.ts` que realicen agregaciones en la base de datos. Ejemplos:
    - `getInvestmentByYear()` que use `groupBy('project_year')` y `_sum('amount_assigned')`.
    - `getInvestmentByRegion()` que use `groupBy('region_id')` y `_sum('amount_assigned')`.

### Fase 1: Construcción de la Narrativa (Landing Page - Nivel 1)
*Objetivo: Crear el punto de entrada principal para el usuario, presentando la historia de los datos a nivel nacional.*

- [ ] **Activar la Página Principal:** Renombrar `src/app/page-disabled.tsx` a `page.tsx`.
- [ ] **Implementar KPIs Nacionales:** Añadir las tarjetas de información (Monto Total, Nº Proyectos) utilizando los nuevos servicios de agregación de la Fase 0.
- [ ] **Implementar Gráfico de Evolución Histórica:** Crear un componente de gráfico de líneas que consuma los datos de `getInvestmentByYear()`.
- [ ] **Implementar Mapa de Coropletas (MVP):** Hacer que el componente `Chile.tsx` reciba los datos de `getInvestmentByRegion()` y coloree cada región según el total de la inversión.

### Fase 2: Interactividad del Dashboard (Página de Exploración - Nivel 2)
*Objetivo: Dar vida al "laboratorio de análisis", asegurando que los filtros y los gráficos trabajen en conjunto.*

- [ ] **Eliminar Datos Estáticos:** Modificar todos los componentes de gráficos para que reciban datos a través de `props`.
- [ ] **Conectar Filtros y Gráficos:** Usar el estado de la `DataTable` (@tanstack/react-table) para obtener las filas filtradas. 
- [ ] **Generar Agregaciones en el Cliente (para los gráficos):** Con los datos ya filtrados en el cliente, calcular las agregaciones necesarias para los gráficos del dashboard (ej. total por fondo, total por línea de la data visible).
- [ ] **Implementar Gráficos Dinámicos:** Crear y renderizar los gráficos de barras apiladas y barras horizontales basados en los datos agregados y filtrados.

### Fase 3: Funcionalidades de Usuario Avanzado
*Objetivo: Añadir características de alto valor para los usuarios que necesitan trabajar con los datos.*

- [ ] **Implementar "Descargar como CSV":** Añadir un botón en la `DataTable` que exporte los datos actualmente filtrados.
- [ ] **Mejorar Tooltips de Gráficos:** Asegurarse de que todos los gráficos muestren información clara y bien formateada al pasar el mouse.

### Fase 4: Optimización y Despliegue
*Objetivo: Preparar la aplicación para producción.*

- [ ] **Implementar Caching:** Investigar y usar Vercel KV o similar para cachear las respuestas de las funciones de servicio más costosas.
- [ ] **Revisión de Rendimiento:** Analizar el rendimiento de las consultas a la base de datos y la carga de la página.

---

# Guía de Inicio Rápido (Desarrollo)

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
