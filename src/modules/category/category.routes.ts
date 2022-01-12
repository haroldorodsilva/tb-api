import Router from 'express'
import CategoryController from './category.controller'

const categoryRouter = Router()

categoryRouter.post('/', new CategoryController().create)
categoryRouter.put('/', new CategoryController().update)
categoryRouter.get('/', new CategoryController().findAll)
categoryRouter.get('/:id([0-9]+)', new CategoryController().findById)
categoryRouter.delete('/:id([0-9]+)', new CategoryController().delete)

export default categoryRouter
