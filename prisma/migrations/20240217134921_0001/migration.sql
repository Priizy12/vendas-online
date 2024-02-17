-- DropForeignKey
ALTER TABLE "Produtos" DROP CONSTRAINT "Produtos_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "Produtos" ADD CONSTRAINT "Produtos_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
