/*
  Warnings:

  - You are about to drop the column `region_altname` on the `Regions` table. All the data in the column will be lost.
  - You are about to drop the column `region_shortname` on the `Regions` table. All the data in the column will be lost.
  - Made the column `region_abbr` on table `Regions` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Regions" (
    "region_id" TEXT NOT NULL PRIMARY KEY,
    "region_name" TEXT NOT NULL,
    "region_abbr" TEXT NOT NULL
);
INSERT INTO "new_Regions" ("region_abbr", "region_id", "region_name") SELECT "region_abbr", "region_id", "region_name" FROM "Regions";
DROP TABLE "Regions";
ALTER TABLE "new_Regions" RENAME TO "Regions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
