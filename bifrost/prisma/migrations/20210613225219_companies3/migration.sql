/*
  Warnings:

  - You are about to drop the column `companiesId` on the `Users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_companiesId_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "companiesId";
