import { Request, Response } from "express"
import { AppError } from "../../shared/errors/AppError"

import CategoryService from "./category.service"
import CreateCategoryDto from "./dto/create-category.dto"
import UpdateCategoryDto from "./dto/update-category.dto"

class CategoryController {
    async create(req: Request, res: Response) {

        const data = req.body as CreateCategoryDto

        const service = new CategoryService()
        const user = await service.create(data)

        return res.json(user)
    }

    async update(req: Request, res: Response) {

        const data = req.body as UpdateCategoryDto

        if (!data.id) throw new AppError("Id of category is required");

        const service = new CategoryService()
        const category = await service.update(data)

        return res.json(category)
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        if (!id) throw new AppError('Id of category is required')

        const service = new CategoryService()
        const deleted = await service.delete(Number(id))

        return res.json(deleted)
    }

    async findAll(req: Request, res: Response) {
        const service = new CategoryService()
        const categories = await service.find()

        return res.json(categories)
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params
        if (!id) throw new AppError('Id of category is required')

        const service = new CategoryService()
        const category = await service.find(Number(id))

        if (!category || !category.length) throw new AppError('Category not found')

        return res.json(category[0])
    }
}

export default CategoryController