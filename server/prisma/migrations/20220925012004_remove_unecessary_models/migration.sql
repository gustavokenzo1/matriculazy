/*
  Warnings:

  - You are about to drop the column `departmentId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `universityId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the `departments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `universities` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `department` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_universityId_fkey";

-- DropForeignKey
ALTER TABLE "departments" DROP CONSTRAINT "departments_universityId_fkey";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "departmentId",
DROP COLUMN "universityId",
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "university" TEXT NOT NULL;

-- DropTable
DROP TABLE "departments";

-- DropTable
DROP TABLE "universities";
