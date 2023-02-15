"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController_1 = require("@src/controllers/cartController");
const router = (0, express_1.Router)();
router.post("/check", cartController_1.checkQuantity);
exports.default = router;
