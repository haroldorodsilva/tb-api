"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sales_controller_1 = __importDefault(require("./sales.controller"));
const salesRouter = (0, express_1.default)();
salesRouter.post('/', new sales_controller_1.default().create);
salesRouter.get('/', new sales_controller_1.default().findAll);
exports.default = salesRouter;
