"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareError = void 0;
const AppError_1 = require("../../errors/AppError");
const middlewareError = (err, req, res, _) => {
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({
            error: err.message
        });
    }
    return res.status(500).json({
        error: 'Ocorreu um erro interno'
    });
};
exports.middlewareError = middlewareError;
