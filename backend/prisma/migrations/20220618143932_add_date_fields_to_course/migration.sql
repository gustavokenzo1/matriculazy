/*
  Warnings:

  - You are about to drop the column `simplifiedSchedule` on the `courses` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "simplifiedSchedule",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
