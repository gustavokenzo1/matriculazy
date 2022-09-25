/*
  Warnings:

  - Added the required column `url` to the `universities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "universities" ADD COLUMN     "url" TEXT NOT NULL;
