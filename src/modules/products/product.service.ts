import { PrismaClient } from '@prisma/client'
import { AppError } from '../../shared/errors/AppError'
import CreateProductDto from './dto/create-product.dto'
import UpdateProductDto from './dto/update-product.dto'

class ProductService {
    private readonly prisma: PrismaClient
    private readonly selectData = {
        id: true,
        nome: true,
        descricao: true,
        quantidade: true,
        valor: true,
        categoria: {
            select: {
                id: true,
                nome: true
            }
        },
    }

    constructor() {
        this.prisma = new PrismaClient()
    }

    async create(createDto: CreateProductDto) {
        const { categoria, ...data } = createDto

        const categoryExists = await this.prisma.categorias.findUnique({
            where: { id: categoria },
        });

        if (!categoryExists || !categoryExists.status) throw new AppError("Category not found");

        const product = await this.prisma.produtos.create({
            data: { ...data, categoriasId: categoria },
            select: this.selectData
        })
        return product
    }

    async update(updateDto: UpdateProductDto) {
        const { id, categoria, ...data } = updateDto

        const exists = await this.prisma.produtos.findUnique({
            where: { id },
        });

        if (!exists) throw new AppError("Product not found");


        if (categoria) {
            const categoryExists = await this.prisma.categorias.findUnique({
                where: { id: categoria },
            });

            if (!categoryExists) throw new AppError("Category not found");
        }

        const product = await this.prisma.produtos.update({
            where: { id },
            data: { ...data, ...(categoria && { categoriasId: categoria }) },
            select: this.selectData
        })
        return product
    }

    async delete(id: number) {
        const exists = await this.prisma.produtos.findUnique({
            where: { id },
        });

        if (!exists) throw new AppError("product not found");

        try {
            return await this.prisma.produtos.delete({ where: { id } })
        } catch (error: any) {
            throw new AppError(error.message);
        }
    }

    async find(id?: number) {
        return await this.prisma.produtos.findMany({
            ...(!!id && { where: { id } }),
            select: this.selectData
        });
    }

}

export default ProductService