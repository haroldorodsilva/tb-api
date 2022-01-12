import { Router } from "express"
import categoryRouter from "../../../modules/category/category.routes";
import productRouter from "../../../modules/products/product.routes";
import salesRouter from "../../../modules/sales/sales.routes";

const mainRouters = Router();

mainRouters.use('/category', categoryRouter)
mainRouters.use('/product', productRouter)
mainRouters.use('/sales', salesRouter)

export { mainRouters }