/*
  Warnings:

  - Added the required column `trackingCode` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "licensePlate" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "trackingCode" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Vehicle" ("brand", "color", "createdAt", "id", "latitude", "licensePlate", "longitude", "model", "updatedAt") SELECT "brand", "color", "createdAt", "id", "latitude", "licensePlate", "longitude", "model", "updatedAt" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
CREATE UNIQUE INDEX "Vehicle_licensePlate_key" ON "Vehicle"("licensePlate");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
