import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface TokenPayload {
    id: string
    iat: number
    exp: number
}

const middlewareAuth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) return res.sendStatus(401)

    const token = authorization.replace('Bearer', '').trim()
    const secret = process.env.JWT_SECRET || 'secret'
    try {
        const data = jwt.verify(token, secret) as TokenPayload

        next()
    } catch {
        return res.sendStatus(401)
    }
}

export { middlewareAuth }
