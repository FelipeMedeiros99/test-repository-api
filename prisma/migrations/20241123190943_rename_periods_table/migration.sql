/*
  Warnings:

  - You are about to drop the `Periods` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_periodoId_fkey";

-- DropTable
DROP TABLE "Periods";

-- CreateTable
CREATE TABLE "periods" (
    "id" SERIAL NOT NULL,
    "period" TEXT NOT NULL,

    CONSTRAINT "periods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
