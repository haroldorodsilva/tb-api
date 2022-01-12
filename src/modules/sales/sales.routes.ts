import Router from 'express'
import SalesController from './sales.controller'

const salesRouter = Router()

salesRouter.post('/', new SalesController().create)
salesRouter.get('/', new SalesController().findAll)

export default salesRouter
