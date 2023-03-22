/*
  Warnings:

  - Added the required column `companyId` to the `Locations` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Locations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Locations_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Locations" ("cep", "city", "created_at", "district", "email", "id", "name", "number", "state", "street", "updated_at") SELECT "cep", "city", "created_at", "district", "email", "id", "name", "number", "state", "street", "updated_at" FROM "Locations";
DROP TABLE "Locations";
ALTER TABLE "new_Locations" RENAME TO "Locations";
CREATE UNIQUE INDEX "Locations_email_key" ON "Locations"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
