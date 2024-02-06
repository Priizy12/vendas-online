-- CreateTable
CREATE TABLE "adress" (
    "id" SERIAL NOT NULL,
    "CEP" TEXT NOT NULL,
    "Bairro" TEXT NOT NULL,
    "Cidade" TEXT NOT NULL,
    "EStado" TEXT NOT NULL,
    "Ponto_referencia" TEXT NOT NULL,
    "numero" INTEGER,
    "complemento" TEXT NOT NULL,
    "Telefone_contato" TEXT NOT NULL,
    "endereco_id" INTEGER NOT NULL,

    CONSTRAINT "adress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "adress" ADD CONSTRAINT "adress_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
