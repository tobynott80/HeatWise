/*
  Warnings:

  - You are about to alter the column `detached_Biomass` on the `HeatingCost` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - You are about to alter the column `detached_Gas` on the `HeatingCost` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - You are about to alter the column `detached_Oil` on the `HeatingCost` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - You are about to alter the column `detached_Resistance` on the `HeatingCost` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - You are about to alter the column `flats_Biomass` on the `HeatingCost` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - You are about to alter the column `flats_Gas` on the `HeatingCost` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - You are about to alter the column `flats_Oil` on the `HeatingCost` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - You are about to alter the column `flats_Resistance` on the `HeatingCost` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - You are about to alter the column `semi_detached_Biomass` on the `HeatingCost` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - You are about to alter the column `semi_detached_Gas` on the `HeatingCost` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - You are about to alter the column `semi_detached_Oil` on the `HeatingCost` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - You are about to alter the column `semi_detached_Resistance` on the `HeatingCost` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - You are about to alter the column `terraced_Biomass` on the `HeatingCost` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - You are about to alter the column `terraced_Gas` on the `HeatingCost` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - You are about to alter the column `terraced_Oil` on the `HeatingCost` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - You are about to alter the column `terraced_Resistance` on the `HeatingCost` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - You are about to alter the column `total` on the `HeatingCost` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.

*/
-- AlterTable
ALTER TABLE "HeatingCost" ALTER COLUMN "detached_Biomass" SET DATA TYPE DECIMAL,
ALTER COLUMN "detached_Gas" SET DATA TYPE DECIMAL,
ALTER COLUMN "detached_Oil" SET DATA TYPE DECIMAL,
ALTER COLUMN "detached_Resistance" SET DATA TYPE DECIMAL,
ALTER COLUMN "flats_Biomass" SET DATA TYPE DECIMAL,
ALTER COLUMN "flats_Gas" SET DATA TYPE DECIMAL,
ALTER COLUMN "flats_Oil" SET DATA TYPE DECIMAL,
ALTER COLUMN "flats_Resistance" SET DATA TYPE DECIMAL,
ALTER COLUMN "semi_detached_Biomass" SET DATA TYPE DECIMAL,
ALTER COLUMN "semi_detached_Gas" SET DATA TYPE DECIMAL,
ALTER COLUMN "semi_detached_Oil" SET DATA TYPE DECIMAL,
ALTER COLUMN "semi_detached_Resistance" SET DATA TYPE DECIMAL,
ALTER COLUMN "terraced_Biomass" SET DATA TYPE DECIMAL,
ALTER COLUMN "terraced_Gas" SET DATA TYPE DECIMAL,
ALTER COLUMN "terraced_Oil" SET DATA TYPE DECIMAL,
ALTER COLUMN "terraced_Resistance" SET DATA TYPE DECIMAL,
ALTER COLUMN "total" SET DATA TYPE DECIMAL;
