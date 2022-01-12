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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const AppError_1 = require("../../shared/errors/AppError");
class SalesService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    create(createDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const produtos = yield Promise.all(createDto.items.map((item) => __awaiter(this, void 0, void 0, function* () {
                const { produto, quantidade } = item;
                const produtoBanco = yield this.prisma.produtos.findUnique({ where: { id: item.produto } });
                if (!produtoBanco)
                    throw new AppError_1.AppError("Product " + produto + " not found");
                if (item.quantidade > Number(produtoBanco.quantidade))
                    throw new AppError_1.AppError("Quantity " + item.quantidade + " is greater than the product " + produto + " in stock");
                return {
                    quantidade,
                    valor: Number(produtoBanco.valor),
                    total: Number((Number(produtoBanco.valor) * quantidade).toFixed(2)),
                    produtosId: produtoBanco.id
                };
            })));
            const total = produtos.reduce((acc, { total }) => acc + total, 0).toFixed(2);
            const sell = yield this.prisma.vendas.create({
                data: {
                    total,
                    items: {
                        createMany: {
                            data: produtos
                        }
                    }
                },
                select: {
                    id: true,
                    total: true,
                    items: {
                        select: {
                            id: true,
                            quantidade: true,
                            valor: true,
                            total: true,
                            produtos: {
                                select: {
                                    id: true,
                                    nome: true
                                }
                            }
                        }
                    }
                }
            });
            //Update Stock
            yield Promise.all(sell.items.map(({ produtos: { id }, quantidade }) => __awaiter(this, void 0, void 0, function* () {
                yield this.prisma.produtos.update({
                    where: { id },
                    data: {
                        quantidade: {
                            decrement: quantidade
                        }
                    }
                });
            })));
            return sell;
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.vendas.findMany(Object.assign(Object.assign({}, (!!id && { where: { id } })), { select: {
                    id: true,
                    total: true,
                    items: {
                        select: {
                            id: true,
                            quantidade: true,
                            valor: true,
                            total: true,
                            produtos: {
                                select: {
                                    id: true,
                                    nome: true
                                }
                            }
                        }
                    }
                } }));
        });
    }
}
exports.default = SalesService;
