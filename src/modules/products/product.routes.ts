import Router from 'express'
import ProductController from './product.controller'

const productRouter = Router()

productRouter.post('/', new ProductController().create)
productRouter.put('/', new ProductController().update)
productRouter.get('/', new ProductController().findAll)
productRouter.get('/:id([0-9]+)', new ProductController().findById)
productRouter.delete('/:id([0-9]+)', new ProductController().delete)

export default productRouter
