"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouters = void 0;
const express_1 = require("express");
const category_routes_1 = __importDefault(require("../../../modules/category/category.routes"));
const product_routes_1 = __importDefault(require("../../../modules/products/product.routes"));
const sales_routes_1 = __importDefault(require("../../../modules/sales/sales.routes"));
const mainRouters = (0, express_1.Router)();
exports.mainRouters = mainRouters;
mainRouters.use('/category', category_routes_1.default);
mainRouters.use('/product', product_routes_1.default);
mainRouters.use('/sales', sales_routes_1.default);
