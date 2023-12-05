-- CreateEnum
CREATE TYPE "Dwelling" AS ENUM ('SEMI', 'DETACHED', 'FLAT', 'TERRACED');

-- CreateEnum
CREATE TYPE "Heating_Type" AS ENUM ('RESISTANCE', 'GAS_BOILER', 'OIL_BOILER', 'BIOMASS_BOILER');

-- CreateTable
CREATE TABLE "HeatingType" (
    "lsoa11cd" TEXT NOT NULL,
    "heatingType" "Heating_Type",
    "dwelling" "Dwelling",
    "value" DECIMAL,

    CONSTRAINT "HeatingType_pkey" PRIMARY KEY ("lsoa11cd")
);

-- AddForeignKey
ALTER TABLE "HeatingType" ADD CONSTRAINT "lsoa11cd___fk" FOREIGN KEY ("lsoa11cd") REFERENCES "lsoa"("lsoa11cd") ON DELETE NO ACTION ON UPDATE NO ACTION;
