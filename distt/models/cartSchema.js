"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const cartItemSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
    cantidad: { type: Number, required: true, min: 1 },
    precio: { type: Number, required: true, min: 0 },
    nombre: { type: String, required: true },
});
const cartSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, required: true, min: 0, default: 0 },
    createdAt: { type: Date, default: Date.now },
});
exports.Cart = (0, mongoose_1.model)('Cart', cartSchema);