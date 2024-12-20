/*
  Warnings:

  - You are about to drop the `Tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tokens";

-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
