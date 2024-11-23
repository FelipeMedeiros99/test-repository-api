/*
  Warnings:

  - Added the required column `periodoId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "periodoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Periods" (
    "id" SERIAL NOT NULL,
    "period" TEXT NOT NULL,

    CONSTRAINT "Periods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "Periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
