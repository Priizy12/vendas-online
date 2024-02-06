/*
  Warnings:

  - You are about to drop the column `EStado` on the `adress` table. All the data in the column will be lost.
  - Added the required column `Estado` to the `adress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Rua` to the `adress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adress" DROP COLUMN "EStado",
ADD COLUMN     "Estado" TEXT NOT NULL,
ADD COLUMN     "Rua" TEXT NOT NULL;
