"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = __importDefault(require("./category.controller"));
const categoryRouter = (0, express_1.default)();
categoryRouter.post('/', new category_controller_1.default().create);
categoryRouter.put('/', new category_controller_1.default().update);
categoryRouter.get('/', new category_controller_1.default().findAll);
categoryRouter.get('/:id([0-9]+)', new category_controller_1.default().findById);
categoryRouter.delete('/:id([0-9]+)', new category_controller_1.default().delete);
exports.default = categoryRouter;
