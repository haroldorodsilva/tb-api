import { PrismaClient } from '@prisma/client'
import { AppError } from '../../shared/errors/AppError'
import CreateCategoryDto from './dto/create-category.dto'
import UpdateCategoryDto from './dto/update-category.dto'

class CategoryService {
    private readonly prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async create(createDto: CreateCategoryDto) {
        const category = await this.prisma.categorias.create({ data: createDto })
        return category
    }

    async update(updateDto: UpdateCategoryDto) {
        const { id, ...data } = updateDto

        const exists = await this.prisma.categorias.findUnique({
            where: { id },
        });

        if (!exists) throw new AppError("Category not found");

        const category = await this.prisma.categorias.update({
            where: { id },
            data
        })
        return category
    }

    async delete(id: number) {
        const exists = await this.prisma.categorias.findUnique({
            where: { id },
        });

        if (!exists) throw new AppError("Category not found");

        try {
            return await this.prisma.categorias.delete({ where: { id } })
        } catch (error: any) {
            throw new AppError(error.message);
        }
    }

    async find(id?: number) {
        return await this.prisma.categorias.findMany({
            ...(!!id && { where: { id } })
        });
    }

}

export default CategoryService