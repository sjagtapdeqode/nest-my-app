/*
  Warnings:

  - You are about to drop the column `LasName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "LasName",
ADD COLUMN     "lastName" TEXT;
