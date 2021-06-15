/*
  Warnings:

  - You are about to drop the column `company` on the `Users` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "company",
ADD COLUMN     "companyId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Companies.domain_unique" ON "Companies"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "Companies.website_unique" ON "Companies"("website");

-- AddForeignKey
ALTER TABLE "Users" ADD FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
