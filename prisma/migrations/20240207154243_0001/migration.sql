/*
  Warnings:

  - Added the required column `amount` to the `card_produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "card_produtos" ADD COLUMN     "amount" INTEGER NOT NULL;
