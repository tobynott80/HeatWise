/*
  Warnings:

  - The primary key for the `HeatingCost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `lad17nm` on the `HeatingCost` table. All the data in the column will be lost.
  - You are about to drop the `lad` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lad19nm` to the `HeatingCost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HeatingCost" DROP CONSTRAINT "lad17cd___fk";

-- DropForeignKey
ALTER TABLE "lsoa" DROP CONSTRAINT "lad17cd___fk";

-- AlterTable
ALTER TABLE "HeatingCost" DROP CONSTRAINT "HeatingCost_pkey",
DROP COLUMN "lad17nm",
ADD COLUMN     "lad19nm" TEXT NOT NULL,
ADD CONSTRAINT "HeatingCost_pkey" PRIMARY KEY ("lad19nm");

-- DropTable
DROP TABLE "lad";

-- CreateTable
CREATE TABLE "lad17" (
    "lad17cd" TEXT NOT NULL,
    "lad17nm" TEXT NOT NULL,

    CONSTRAINT "lad17_pkey" PRIMARY KEY ("lad17cd")
);

-- CreateTable
CREATE TABLE "lad19" (
    "lad19cd" TEXT NOT NULL,
    "lad19nm" TEXT NOT NULL,

    CONSTRAINT "lad19_pkey" PRIMARY KEY ("lad19cd")
);

-- CreateIndex
CREATE UNIQUE INDEX "lad17_lad17nm_key" ON "lad17"("lad17nm");

-- CreateIndex
CREATE INDEX "lad__index" ON "lad17"("lad17cd");

-- CreateIndex
CREATE UNIQUE INDEX "lad19_lad19nm_key" ON "lad19"("lad19nm");

-- CreateIndex
CREATE INDEX "lad19__index" ON "lad19"("lad19cd");

-- AddForeignKey
ALTER TABLE "HeatingCost" ADD CONSTRAINT "lad19cd___fk" FOREIGN KEY ("lad19nm") REFERENCES "lad19"("lad19nm") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lsoa" ADD CONSTRAINT "lad17cd___fk" FOREIGN KEY ("lad17cd") REFERENCES "lad17"("lad17cd") ON DELETE NO ACTION ON UPDATE NO ACTION;
