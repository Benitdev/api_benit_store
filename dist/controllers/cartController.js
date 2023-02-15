"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkQuantity = void 0;
const Product_1 = __importDefault(require("@src/models/Product"));
const checkQuantity = async (req, res) => {
    try {
        console.log(req.body);
        const { _id, size, quantity } = req.body;
        const product = await Product_1.default.findById(_id);
        const existProductSize = product === null || product === void 0 ? void 0 : product.countInStock.find((item) => item.size == size);
        if (existProductSize.count >= quantity)
            res.status(200).json({ message: "Ok" });
        else
            res.status(400).json({ message: "Out of stock" });
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.checkQuantity = checkQuantity;
