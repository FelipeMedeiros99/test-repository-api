/*
  Warnings:

  - You are about to drop the `periods` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_periodId_fkey";

-- DropTable
DROP TABLE "periods";
