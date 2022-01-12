"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../../shared/errors/AppError");
const category_service_1 = __importDefault(require("./category.service"));
class CategoryController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const service = new category_service_1.default();
            const user = yield service.create(data);
            return res.json(user);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            if (!data.id)
                throw new AppError_1.AppError("Id of category is required");
            const service = new category_service_1.default();
            const category = yield service.update(data);
            return res.json(category);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id)
                throw new AppError_1.AppError('Id of category is required');
            const service = new category_service_1.default();
            const deleted = yield service.delete(Number(id));
            return res.json(deleted);
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new category_service_1.default();
            const categories = yield service.find();
            return res.json(categories);
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id)
                throw new AppError_1.AppError('Id of category is required');
            const service = new category_service_1.default();
            const category = yield service.find(Number(id));
            if (!category || !category.length)
                throw new AppError_1.AppError('Category not found');
            return res.json(category[0]);
        });
    }
}
exports.default = CategoryController;
