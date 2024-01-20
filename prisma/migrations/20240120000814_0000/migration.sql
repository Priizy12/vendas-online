-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(125) NOT NULL,
    `email` VARCHAR(125) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `Telefone` VARCHAR(12) NOT NULL,
    `role` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_senha_key`(`senha`),
    UNIQUE INDEX `users_cpf_key`(`cpf`),
    UNIQUE INDEX `users_Telefone_key`(`Telefone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produtos` (
    `id_produto` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_produto` VARCHAR(125) NOT NULL,
    `preco` INTEGER NOT NULL,
    `descricao` VARCHAR(125) NOT NULL,
    `estoque` INTEGER NOT NULL,

    PRIMARY KEY (`id_produto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `card_produtos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produtoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `card_produtos` ADD CONSTRAINT `card_produtos_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Produtos`(`id_produto`) ON DELETE RESTRICT ON UPDATE CASCADE;
