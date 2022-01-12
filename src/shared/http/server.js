"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("./http"));
const port = process.env.PORT || 4000;
http_1.default.listen(port, () => {
    console.log('✔ Server is running on', port);
});
