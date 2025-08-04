// middlewares/auth.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.JWTtoken;
  console.log("the token is ", token );

  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    //@ts-ignore
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
    if (req.user?.role === "admin") return next();
  return res.status(403).json({ message: "Access denied: Admins only" });
};


