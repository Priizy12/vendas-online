/*
  Warnings:

  - Added the required column `Rua` to the `Adress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Adress" ADD COLUMN     "Rua" TEXT NOT NULL;
