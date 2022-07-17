/*
  Warnings:

  - You are about to drop the column `company` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `AccessTokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccessTokens" DROP CONSTRAINT "AccessTokens_userId_fkey";

-- DropIndex
DROP INDEX "Users_password_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "company",
DROP COLUMN "password";

-- DropTable
DROP TABLE "AccessTokens";
