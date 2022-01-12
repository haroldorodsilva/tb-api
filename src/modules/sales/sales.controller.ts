import { Request, Response } from "express"
import { AppError } from "../../shared/errors/AppError"
import CreateSalesDto from "./dto/create-sales.dto"

import SalesService from "./sales.service"


class SalesController {
    async create(req: Request, res: Response) {

        const data = req.body as CreateSalesDto

        const service = new SalesService()
        const user = await service.create(data)

        return res.json(user)
    }

    async findAll(req: Request, res: Response) {
        const service = new SalesService()
        const sales = await service.find()

        return res.json(sales)
    }
}

export default SalesController