/*
  Warnings:

  - Added the required column `userId` to the `Companies` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Companies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Companies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Companies" ("cnpj", "created_at", "id", "name", "updated_at", "website") SELECT "cnpj", "created_at", "id", "name", "updated_at", "website" FROM "Companies";
DROP TABLE "Companies";
ALTER TABLE "new_Companies" RENAME TO "Companies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
