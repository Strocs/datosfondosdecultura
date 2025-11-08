# Gemini Project Context: Datos Fondos de Cultura

## Project Overview

This is a full-stack web application designed to visualize public data from Chile's "Fondos de Cultura" (Culture Funds). The project scrapes data from public sources (including PDFs), processes it, stores it in a database, and presents it to the user through an interactive web interface with tables and charts.

**Core Technologies:**
*   **Framework:** Next.js 14 (with App Router)
*   **Language:** TypeScript
*   **Frontend:** React, Tailwind CSS, Recharts (charts), TanStack Table (data tables)
*   **UI Components:** Shadcn/UI (using Radix UI and Lucide icons)
*   **Database ORM:** Prisma
*   **Database:** SQLite for local development (via `dev.db`) and likely Turso DB for production (inferred from `README.md` and dependencies).
*   **Data Scraping:** A combination of Node.js (`cheerio`) and Python scripts located in the `scripts/` directory.

**Architecture:**
*   The application follows a standard Next.js App Router structure.
*   Data fetching and processing pipelines are handled by standalone scripts in the `scripts/` directory.
*   The database schema, migrations, and seeding are managed by Prisma in the `prisma/` directory.
*   The frontend is built with server and client components, located in `src/app/`. Reusable UI components are in `src/components/`.
*   Global state management might be handled by Zustand, given its presence in the dependencies.

## Building and Running

Key commands are defined in `package.json`:

*   **Run development server:**
    ```bash
    bun run dev
    ```
*   **Create a production build:**
    ```bash
    bun run build
    ```
*   **Start the production server:**
    ```bash
    bun run start
    ```
*   **Lint the code:**
    ```bash
    bun run lint
    ```

### Database Operations

Database commands require the `.env.local` file.

*   **Run migrations:**
    ```bash
    bun run prisma:migrate
    ```
*   **Seed the database:**
    ```bash
    bun run prisma:seed
    ```

### Data Scraping & Processing

These scripts form the data ingestion pipeline.

*   **Scrape PDF links:**
    ```bash
    bun run pdf:scrape
    ```
*   **Download PDFs:**
    ```bash
    bun run pdf:download
    ```
*   **Parse PDFs and update DB:**
    ```bash
    bun run pdf:parser
    ```

## Development Conventions

*   **Styling:** The project uses Tailwind CSS for styling. Utility classes are automatically sorted using the Prettier plugin for Tailwind CSS.
*   **Code Quality:** ESLint and Prettier are configured to enforce a consistent code style. Run `bun run lint` to check for issues.
*   **Database:** Changes to the database schema **must** be done by editing `prisma/schema.prisma` and then creating a new migration with `bun run prisma:migrate`.
*   **Data Model:** The core data models are `Projects`, `Regions`, `Funds`, and `Lines`, all defined in `prisma/schema.prisma`.
