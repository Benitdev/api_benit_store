"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: { type: String, required: true },
    rating: { type: Number, default: 5 },
    comment: { type: String, required: true, default: "" },
}, {
    timestamps: true,
});
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    childrenCategory: { type: String },
    imageDefault: { type: String },
    images: { type: Array, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: [
        {
            size: { type: Number, required: true, default: 0 },
            count: { type: Number, required: true, default: 0 },
        },
    ],
    description: { type: String, required: true },
    reviews: [reviewSchema],
    isFeatured: { type: Boolean, required: true, default: false },
    isSlide: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Product", productSchema);
