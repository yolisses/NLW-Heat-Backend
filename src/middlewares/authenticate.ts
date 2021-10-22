import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization

    if (!authToken) {
        return res.status(401).json({
            errorCode: 'token.missing'
        })
    }

    /*
    Bearer 43hj1b41hv3g4y1v3gh4j1
    [0] Bearer
    [1] 43hj1b41hv3g4y1v3gh4j1
     */
    const [, token] = authToken.split(' ')

    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as IPayload
        req.user_id = sub
        return next()
    } catch (err) {
        return res.status(401).json({
            error: err.message,
            errorCode: 'token.invalid'
        })
    }
}