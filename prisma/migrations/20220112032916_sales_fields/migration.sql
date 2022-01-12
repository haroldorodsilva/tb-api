/*
  Warnings:

  - You are about to drop the `_VendasProdutos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `valor` to the `Produtos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_VendasProdutos" DROP CONSTRAINT "_VendasProdutos_A_fkey";

-- DropForeignKey
ALTER TABLE "_VendasProdutos" DROP CONSTRAINT "_VendasProdutos_B_fkey";

-- AlterTable
ALTER TABLE "Produtos" ADD COLUMN     "valor" DECIMAL(18,4) NOT NULL;

-- DropTable
DROP TABLE "_VendasProdutos";

-- CreateTable
CREATE TABLE "VendaItem" (
    "id" SERIAL NOT NULL,
    "quantidade" DECIMAL(18,4) NOT NULL,
    "valor" DECIMAL(18,2) NOT NULL,
    "total" DECIMAL(18,2) NOT NULL,
    "vendasId" INTEGER,
    "produtosId" INTEGER NOT NULL,

    CONSTRAINT "VendaItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VendaItem" ADD CONSTRAINT "VendaItem_produtosId_fkey" FOREIGN KEY ("produtosId") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaItem" ADD CONSTRAINT "VendaItem_vendasId_fkey" FOREIGN KEY ("vendasId") REFERENCES "Vendas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
