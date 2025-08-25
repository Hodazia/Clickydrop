"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = async (req, res, next) => {
    try {
        const header = req.headers.authorization || req.headers.Authorization;
        if (!header) {
            res.status(401).json({ message: 'Unauthorized, missing headers' });
            return;
        }
        const parts = header.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            res.status(403).json({
                message: "Unauthorized"
            });
            return;
        }
        const token = parts[1];
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        // Support multiple payload shapes: { userId }, { userid }, { id }
        const raw = verified.userId ?? verified.userid ?? verified.id;
        const numeric = typeof raw === 'number' ? raw : Number(raw);
        if (!Number.isFinite(numeric)) {
            res.status(401).json({ message: 'Unauthorized, invalid token payload' });
            return;
        }
        req.tokenuserid = numeric;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(403).json({ message: 'Unauthorized' });
        return;
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.js.map