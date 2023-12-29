/*
  Warnings:

  - You are about to drop the column `profilrImageUrl` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "profilrImageUrl",
ADD COLUMN     "profileImageUrl" TEXT;
