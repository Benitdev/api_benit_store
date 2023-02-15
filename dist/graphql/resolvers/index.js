"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productResolver_1 = __importDefault(require("./productResolver"));
const resolvers = {
    Query: Object.assign({}, productResolver_1.default),
};
exports.default = resolvers;
