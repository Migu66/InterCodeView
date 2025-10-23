/*
  Warnings:

  - Added the required column `statement` to the `exercises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exercises" ADD COLUMN     "statement" TEXT NOT NULL;
