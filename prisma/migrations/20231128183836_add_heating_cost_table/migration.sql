-- AlterTable
ALTER TABLE "lsoaCoordinates" ALTER COLUMN "x_coordinate" SET DATA TYPE DECIMAL,
ALTER COLUMN "y_coordinate" SET DATA TYPE DECIMAL;

-- CreateTable
CREATE TABLE "HeatingCost" (
    "lsoa11cd" TEXT NOT NULL,
    "detached_Biomass" MONEY NOT NULL,
    "detached_Gas" MONEY NOT NULL,
    "detached_Oil" MONEY NOT NULL,
    "detached_Resistance" MONEY NOT NULL,
    "flats_Biomass" MONEY NOT NULL,
    "flats_Gas" MONEY NOT NULL,
    "flats_Oil" MONEY NOT NULL,
    "flats_Resistance" MONEY NOT NULL,
    "semi_detached_Biomass" MONEY NOT NULL,
    "semi_detached_Gas" MONEY NOT NULL,
    "semi_detached_Oil" MONEY NOT NULL,
    "semi_detached_Resistance" MONEY NOT NULL,
    "terraced_Biomass" MONEY NOT NULL,
    "terraced_Gas" MONEY NOT NULL,
    "terraced_Oil" MONEY NOT NULL,
    "terraced_Resistance" MONEY NOT NULL,

    CONSTRAINT "HeatingCost_pkey" PRIMARY KEY ("lsoa11cd")
);

-- AddForeignKey
ALTER TABLE "HeatingCost" ADD CONSTRAINT "lsoa11cd___fk" FOREIGN KEY ("lsoa11cd") REFERENCES "lsoa"("lsoa11cd") ON DELETE NO ACTION ON UPDATE NO ACTION;
