/*
  Warnings:

  - You are about to drop the column `department` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `university` on the `courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "department",
DROP COLUMN "university";
