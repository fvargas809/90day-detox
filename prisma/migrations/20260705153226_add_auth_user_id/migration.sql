/*
  Warnings:

  - A unique constraint covering the columns `[authUserId]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Lead_authUserId_key" ON "Lead"("authUserId");
