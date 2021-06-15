/*
  Warnings:

  - Added the required column `website` to the `Companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Companies" ADD COLUMN     "website" TEXT NOT NULL;
