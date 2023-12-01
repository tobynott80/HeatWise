/*
  Warnings:

  - The primary key for the `HeatingCost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `lsoa11cd` on the `HeatingCost` table. All the data in the column will be lost.
  - You are about to drop the column `lad17nm` on the `lsoa` table. All the data in the column will be lost.
  - Added the required column `lad17cd` to the `HeatingCost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HeatingCost" DROP CONSTRAINT "lsoa11cd___fk";

-- DropIndex
DROP INDEX "lsoa__index";

-- AlterTable
ALTER TABLE "HeatingCost" DROP CONSTRAINT "HeatingCost_pkey",
DROP COLUMN "lsoa11cd",
ADD COLUMN     "lad17cd" TEXT NOT NULL,
ADD CONSTRAINT "HeatingCost_pkey" PRIMARY KEY ("lad17cd");

-- AlterTable
ALTER TABLE "lsoa" DROP COLUMN "lad17nm";

-- CreateTable
CREATE TABLE "lad" (
    "lad17cd" TEXT NOT NULL,
    "lad17nm" TEXT NOT NULL,

    CONSTRAINT "lad_pkey" PRIMARY KEY ("lad17cd")
);

-- CreateIndex
CREATE INDEX "lad__index" ON "lad"("lad17cd");

-- CreateIndex
CREATE INDEX "lsoa__index" ON "lsoa"("lsoa11cd");

-- AddForeignKey
ALTER TABLE "HeatingCost" ADD CONSTRAINT "lad17cd___fk" FOREIGN KEY ("lad17cd") REFERENCES "lad"("lad17cd") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lsoa" ADD CONSTRAINT "lad17cd___fk" FOREIGN KEY ("lad17cd") REFERENCES "lad"("lad17cd") ON DELETE NO ACTION ON UPDATE NO ACTION;
