/*
  Warnings:

  - You are about to drop the column `company` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[website]` on the table `Companies` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "company",
ADD COLUMN     "companiesId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Companies.website_unique" ON "Companies"("website");

-- AddForeignKey
ALTER TABLE "Users" ADD FOREIGN KEY ("companiesId") REFERENCES "Companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
