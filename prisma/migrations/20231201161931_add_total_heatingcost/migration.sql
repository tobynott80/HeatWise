/*
  Warnings:

  - Added the required column `total` to the `HeatingCost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HeatingCost" ADD COLUMN     "total" MONEY NOT NULL;
