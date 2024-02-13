-- CreateTable
CREATE TABLE "ImagemProduto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "produtoId" INTEGER NOT NULL,

    CONSTRAINT "ImagemProduto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImagemProduto" ADD CONSTRAINT "ImagemProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;
