import { PrismaClient } from '@prisma/client'
import { AppError } from '../../shared/errors/AppError'
import CreateSalesDto from './dto/create-sales.dto'

class SalesService {
    private readonly prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async create(createDto: CreateSalesDto) {
        const produtos = await Promise.all(createDto.items.map(async (item) => {
            const { produto, quantidade } = item

            const produtoBanco = await this.prisma.produtos.findUnique({ where: { id: item.produto } })

            if (!produtoBanco) throw new AppError("Product " + produto + " not found")

            if (item.quantidade > Number(produtoBanco.quantidade))
                throw new AppError("Quantity " + item.quantidade + " is greater than the product " + produto + " in stock")

            return {
                quantidade,
                valor: Number(produtoBanco.valor),
                total: Number((Number(produtoBanco.valor) * quantidade).toFixed(2)),
                produtosId: produtoBanco.id
            }
        }))

        const total = produtos.reduce((acc, { total }) => acc + total, 0).toFixed(2)

        const sell = await this.prisma.vendas.create(
            {
                data: {
                    total,
                    items: {
                        createMany: {
                            data: produtos
                        }
                    }
                },
                select: {
                    id: true,
                    total: true,
                    items: {
                        select: {
                            id: true,
                            quantidade: true,
                            valor: true,
                            total: true,
                            produtos: {
                                select: {
                                    id: true,
                                    nome: true
                                }
                            }
                        }
                    }
                }
            }
        )

        //Update Stock
        await Promise.all(sell.items.map(async ({ produtos: { id }, quantidade }) => {
            await this.prisma.produtos.update({
                where: { id },
                data: {
                    quantidade: {
                        decrement: quantidade
                    }
                }
            })
        }))

        return sell
    }

    async find(id?: number) {
        return await this.prisma.vendas.findMany({
            ...(!!id && { where: { id } }),
            select: {
                id: true,
                total: true,
                items: {
                    select: {
                        id: true,
                        quantidade: true,
                        valor: true,
                        total: true,
                        produtos: {
                            select: {
                                id: true,
                                nome: true
                            }
                        }
                    }
                }
            }
        });
    }

}

export default SalesService