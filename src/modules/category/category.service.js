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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const AppError_1 = require("../../shared/errors/AppError");
class CategoryService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    create(createDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.prisma.categorias.create({ data: createDto });
            return category;
        });
    }
    update(updateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = updateDto, data = __rest(updateDto, ["id"]);
            const exists = yield this.prisma.categorias.findUnique({
                where: { id },
            });
            if (!exists)
                throw new AppError_1.AppError("Category not found");
            const category = yield this.prisma.categorias.update({
                where: { id },
                data
            });
            return category;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.prisma.categorias.findUnique({
                where: { id },
            });
            if (!exists)
                throw new AppError_1.AppError("Category not found");
            try {
                return yield this.prisma.categorias.delete({ where: { id } });
            }
            catch (error) {
                throw new AppError_1.AppError(error.message);
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.categorias.findMany(Object.assign({}, (!!id && { where: { id } })));
        });
    }
}
exports.default = CategoryService;
