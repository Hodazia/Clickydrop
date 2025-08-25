import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            tokenuserid?: number;
        }
    }
}
export declare const verifyToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map