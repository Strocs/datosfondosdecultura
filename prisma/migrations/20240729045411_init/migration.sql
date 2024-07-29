-- CreateTable
CREATE TABLE "Projects" (
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
    CONSTRAINT "Projects_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "Funds" ("fund_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Projects_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Regions" ("region_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Projects_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "Lines" ("line_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Regions" (
    "region_id" TEXT NOT NULL PRIMARY KEY,
    "region_name" TEXT NOT NULL,
    "region_abbr" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Funds" (
    "fund_id" TEXT NOT NULL PRIMARY KEY,
    "fund_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Lines" (
    "line_id" TEXT NOT NULL PRIMARY KEY,
    "line_name" TEXT NOT NULL
);
