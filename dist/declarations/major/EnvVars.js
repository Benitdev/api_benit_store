"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    nodeEnv: (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "",
    port: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 0,
    mongooseURI: (_c = process.env.MONGODB_URI) !== null && _c !== void 0 ? _c : "",
    cookieProps: {
        key: "ExpressGeneratorTs",
        secret: (_d = process.env.COOKIE_SECRET) !== null && _d !== void 0 ? _d : "",
        options: {
            httpOnly: true,
            signed: true,
            path: (_e = process.env.COOKIE_PATH) !== null && _e !== void 0 ? _e : "",
            maxAge: Number((_f = process.env.COOKIE_EXP) !== null && _f !== void 0 ? _f : 0),
            domain: (_g = process.env.COOKIE_DOMAIN) !== null && _g !== void 0 ? _g : "",
            secure: process.env.SECURE_COOKIE === "true",
        },
    },
    jwt: {
        secret: (_h = process.env.JWT_SECRET) !== null && _h !== void 0 ? _h : "",
        exp: (_j = process.env.COOKIE_EXP) !== null && _j !== void 0 ? _j : "",
    },
};
