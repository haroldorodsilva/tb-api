import express from 'express'
import 'express-async-errors'

import cors from 'cors'
import helmet from 'helmet'

import 'dotenv/config'
import { mainRouters } from './routes'
import { middlewareError } from './middlewares/middlewareError'

const app = express();
app.disable('x-powered-by')

app.use(express.json())
app.use(helmet())
app.use(cors())

app.use('/', mainRouters)
app.use(middlewareError)

export default app