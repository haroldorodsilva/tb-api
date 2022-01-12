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
const product_service_1 = __importDefault(require("./product.service"));
class ProductController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const service = new product_service_1.default();
            const user = yield service.create(data);
            return res.json(user);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            if (!data.id)
                throw new AppError_1.AppError("Id of product is required");
            const service = new product_service_1.default();
            const product = yield service.update(data);
            return res.json(product);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id)
                throw new AppError_1.AppError('Id of product is required');
            const service = new product_service_1.default();
            const deleted = yield service.delete(Number(id));
            return res.json(deleted);
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new product_service_1.default();
            const products = yield service.find();
            return res.json(products);
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id)
                throw new AppError_1.AppError('Id of product is required');
            const service = new product_service_1.default();
            const product = yield service.find(Number(id));
            if (!product || !product.length)
                throw new AppError_1.AppError('product not found');
            return res.json(product[0]);
        });
    }
}
exports.default = ProductController;
