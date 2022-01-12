import { Request, Response } from "express"
import { AppError } from "../../shared/errors/AppError"

import CreateProductDto from "./dto/create-product.dto"
import UpdateProductDto from "./dto/update-product.dto"
import ProductService from "./product.service"

class ProductController {
    async create(req: Request, res: Response) {

        const data = req.body as CreateProductDto

        const service = new ProductService()
        const user = await service.create(data)

        return res.json(user)
    }

    async update(req: Request, res: Response) {

        const data = req.body as UpdateProductDto

        if (!data.id) throw new AppError("Id of product is required");

        const service = new ProductService()
        const product = await service.update(data)

        return res.json(product)
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        if (!id) throw new AppError('Id of product is required')

        const service = new ProductService()
        const deleted = await service.delete(Number(id))

        return res.json(deleted)
    }

    async findAll(req: Request, res: Response) {
        const service = new ProductService()
        const products = await service.find()

        return res.json(products)
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params
        if (!id) throw new AppError('Id of product is required')

        const service = new ProductService()
        const product = await service.find(Number(id))

        if (!product || !product.length) throw new AppError('product not found')

        return res.json(product[0])
    }
}

export default ProductController