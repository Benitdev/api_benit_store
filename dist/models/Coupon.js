"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const couponSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    type: { type: Number, required: true, default: 0 },
    value: { type: Number },
    expires: { type: Date },
}, {
    timestamps: true,
});
module.exports = mongoose_1.default.model("Coupon", couponSchema);
