"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("./product.controller"));
const productRouter = (0, express_1.default)();
productRouter.post('/', new product_controller_1.default().create);
productRouter.put('/', new product_controller_1.default().update);
productRouter.get('/', new product_controller_1.default().findAll);
productRouter.get('/:id([0-9]+)', new product_controller_1.default().findById);
productRouter.delete('/:id([0-9]+)', new product_controller_1.default().delete);
exports.default = productRouter;
