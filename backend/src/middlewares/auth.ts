import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"


declare global {
    namespace Express {
        interface Request {
            tokenuserid?: number
        }
    }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const header = req.headers.authorization || req.headers.Authorization as string
        if (!header) {
            res.status(401).json({ message: 'Unauthorized, missing headers' })
            return;
        }
        const parts = header.split(' ')
        if(parts.length !== 2 || parts[0] !== 'Bearer'){
            res.status(403).json({
                message: "Unauthorized"
            })
            return
        }
        const token = parts[1]
        const verified = jwt.verify(token as string, process.env.JWT_SECRET || 'secret') as JwtPayload
        // Support multiple payload shapes: { userId }, { userid }, { id }
        const raw = (verified as any).userId ?? (verified as any).userid ?? (verified as any).id
        const numeric = typeof raw === 'number' ? raw : Number(raw)
        if (!Number.isFinite(numeric)) {
            res.status(401).json({ message: 'Unauthorized, invalid token payload' })
            return
        }
        req.tokenuserid = numeric
        next()
    } catch (error) {
        console.log(error)
        res.status(403).json({ message: 'Unauthorized' })
        return;
    }
}