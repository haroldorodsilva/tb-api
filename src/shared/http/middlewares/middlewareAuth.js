"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middlewareAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        return res.sendStatus(401);
    const token = authorization.replace('Bearer', '').trim();
    const secret = process.env.JWT_SECRET || 'secret';
    try {
        const data = jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (_a) {
        return res.sendStatus(401);
    }
};
exports.middlewareAuth = middlewareAuth;
