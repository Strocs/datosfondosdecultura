-- CreateTable
CREATE TABLE "Project" (
    "project_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "project_name" TEXT NOT NULL,
    "project_owner" TEXT NOT NULL,
    "fund_id" TEXT NOT NULL,
    "project_year" INTEGER NOT NULL,
    "region_id" TEXT NOT NULL,
    "line_id" TEXT NOT NULL,
    "modality" TEXT,
    "status" TEXT,
    "amount_assigned" INTEGER,
    CONSTRAINT "Project_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "Fund" ("fund_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Project_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Region" ("region_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Project_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "Line" ("line_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Region" (
    "region_id" TEXT NOT NULL PRIMARY KEY,
    "region_name" TEXT NOT NULL,
    "region_shortname" TEXT NOT NULL,
    "region_altname" TEXT,
    "region_abbr" TEXT
);

-- CreateTable
CREATE TABLE "Fund" (
    "fund_id" TEXT NOT NULL PRIMARY KEY,
    "fund_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Line" (
    "line_id" TEXT NOT NULL PRIMARY KEY,
    "line_name" TEXT NOT NULL
);
