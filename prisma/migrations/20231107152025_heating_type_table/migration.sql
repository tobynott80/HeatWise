/*
  Warnings:

  - You are about to drop the column `dwelling` on the `HeatingType` table. All the data in the column will be lost.
  - You are about to drop the column `heatingType` on the `HeatingType` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `HeatingType` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HeatingType" DROP COLUMN "dwelling",
DROP COLUMN "heatingType",
DROP COLUMN "value",
ADD COLUMN     "detached_Biomass" DECIMAL,
ADD COLUMN     "detached_Gas" DECIMAL,
ADD COLUMN     "detached_Oil" DECIMAL,
ADD COLUMN     "detached_Resistance" DECIMAL,
ADD COLUMN     "flats_Biomass" DECIMAL,
ADD COLUMN     "flats_Gas" DECIMAL,
ADD COLUMN     "flats_Oil" DECIMAL,
ADD COLUMN     "flats_Resistance" DECIMAL,
ADD COLUMN     "semi_detached_Biomass" DECIMAL,
ADD COLUMN     "semi_detached_Gas" DECIMAL,
ADD COLUMN     "semi_detached_Oil" DECIMAL,
ADD COLUMN     "semi_detached_Resistance" DECIMAL,
ADD COLUMN     "terraced_Biomass" DECIMAL,
ADD COLUMN     "terraced_Gas" DECIMAL,
ADD COLUMN     "terraced_Oil" DECIMAL,
ADD COLUMN     "terraced_Resistance" DECIMAL;

-- DropEnum
DROP TYPE "Dwelling";

-- DropEnum
DROP TYPE "Heating_Type";
