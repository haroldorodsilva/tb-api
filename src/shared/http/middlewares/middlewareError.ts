import { Request, Response, NextFunction } from 'express'
import { AppError } from '../../errors/AppError'


const middlewareError = (
    err: Error,
    req: Request,
    res: Response,
    _: NextFunction
) => {

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message
        })
    }

    return res.status(500).json({
        error: 'Ocorreu um erro interno'
    })
}

export { middlewareError }
