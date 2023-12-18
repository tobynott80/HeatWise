/*
  Warnings:

  - The primary key for the `HeatingCost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `lad17cd` on the `HeatingCost` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lad17nm]` on the table `lad` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lad17nm` to the `HeatingCost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HeatingCost" DROP CONSTRAINT "lad17cd___fk";

-- AlterTable
ALTER TABLE "HeatingCost" DROP CONSTRAINT "HeatingCost_pkey",
DROP COLUMN "lad17cd",
ADD COLUMN     "lad17nm" TEXT NOT NULL,
ADD CONSTRAINT "HeatingCost_pkey" PRIMARY KEY ("lad17nm");

-- CreateIndex
CREATE UNIQUE INDEX "lad_lad17nm_key" ON "lad"("lad17nm");

-- AddForeignKey
ALTER TABLE "HeatingCost" ADD CONSTRAINT "lad17cd___fk" FOREIGN KEY ("lad17nm") REFERENCES "lad"("lad17nm") ON DELETE NO ACTION ON UPDATE NO ACTION;
