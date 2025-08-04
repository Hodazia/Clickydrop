"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyToken = void 0;
// middlewares/auth.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies.JWTtoken;
    console.log("the token is ", token);
    if (!token)
        return res.status(401).json({ message: "Token missing" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        //@ts-ignore
        req.user = decoded; // { id, role }
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.verifyToken = verifyToken;
const verifyAdmin = (req, res, next) => {
    //@ts-ignore
    if (req.user?.role === "admin")
        return next();
    return res.status(403).json({ message: "Access denied: Admins only" });
};
exports.verifyAdmin = verifyAdmin;
//# sourceMappingURL=auth.js.map