/*
  Warnings:

  - You are about to drop the column `periodoId` on the `tests` table. All the data in the column will be lost.
  - Added the required column `periodId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_periodoId_fkey";

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "periodoId",
ADD COLUMN     "periodId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
