/*
  Warnings:

  - Added the required column `adressId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "adressId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Adress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
