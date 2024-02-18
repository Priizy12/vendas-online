-- CreateTable
CREATE TABLE "ImageProduto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "produtoId" INTEGER NOT NULL,

    CONSTRAINT "ImageProduto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImageProduto" ADD CONSTRAINT "ImageProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;
