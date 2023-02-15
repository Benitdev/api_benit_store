"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("@src/models/Product"));
exports.default = {
    products: async (_, { category, style, gender, size, search, isSlide, isDiscount, isBestSale, isTopRate, isNew, limit = 0, skip = 0, }) => {
        console.log({
            category,
            style,
            gender,
            size,
            search,
            isSlide,
            isDiscount,
            isBestSale,
            isTopRate,
        });
        if (isDiscount)
            return Product_1.default.find({ isFeatured: isDiscount }).limit(limit);
        if (isSlide)
            return Product_1.default.find({ isSlide });
        if (isNew)
            return Product_1.default.find().sort({ createdAd: -1 }).limit(limit);
        if (isTopRate)
            return Product_1.default.find().sort({ rating: -1 }).limit(limit);
        const criteria = [];
        const styleRegex = new RegExp(`${style || ""}`, "g");
        if (category && category != "products")
            criteria.push({ category });
        if (style)
            criteria.push({ childrenCategory: styleRegex });
        if (gender && (category == "products" || category == "sales"))
            criteria.push({ category: gender });
        if (search)
            criteria.push({ name: new RegExp(`${search}`, "i") });
        const query = criteria.length > 0 ? { $and: criteria } : {};
        return Product_1.default.find(query).limit(limit).skip(skip);
    },
    productDetail: async (_, { slug }) => {
        return Product_1.default.findOne({ slug }).lean();
    },
};
