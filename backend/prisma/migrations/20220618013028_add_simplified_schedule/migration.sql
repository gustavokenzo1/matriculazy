/*
  Warnings:

  - The `schedule` column on the `courses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "simplifiedSchedule" TEXT[],
DROP COLUMN "schedule",
ADD COLUMN     "schedule" TEXT[];
