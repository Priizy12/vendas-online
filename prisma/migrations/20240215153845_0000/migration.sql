-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(125) NOT NULL,
    "email" VARCHAR(125) NOT NULL,
    "senha" VARCHAR(100) NOT NULL,
    "Telefone" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produtos" (
    "id_produto" SERIAL NOT NULL,
    "nome_produto" VARCHAR(125) NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "descricao" VARCHAR(125) NOT NULL,
    "estoque" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Produtos_pkey" PRIMARY KEY ("id_produto")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_produtos" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "card_produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adress" (
    "id" SERIAL NOT NULL,
    "CEP" TEXT NOT NULL,
    "numero" INTEGER,
    "complemento" TEXT NOT NULL,
    "ponto_de_referencia" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "telefone_contato" TEXT NOT NULL,
    "endereco_id" INTEGER NOT NULL,

    CONSTRAINT "Adress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_Telefone_key" ON "users"("Telefone");

-- CreateIndex
CREATE UNIQUE INDEX "users_CPF_key" ON "users"("CPF");

-- AddForeignKey
ALTER TABLE "Produtos" ADD CONSTRAINT "Produtos_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_produtos" ADD CONSTRAINT "card_produtos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_produtos" ADD CONSTRAINT "card_produtos_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adress" ADD CONSTRAINT "Adress_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
