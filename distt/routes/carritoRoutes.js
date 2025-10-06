"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authmiddleware_1 = require("../Middleware/authMiddelWare");
const cartcontroller_1 = require("../controllers/cartController");
const router = express_1.default.Router();
router.use(authmiddleware_1.authMiddleware);
router.get('/:userId/cart', authmiddleware_1.authMiddleware, cartcontroller_1.getCart);
router.post('/:userId/cart', authmiddleware_1.authMiddleware, cartcontroller_1.addToCart);
router.put('/:userId/cart', authmiddleware_1.authMiddleware, cartcontroller_1.updateCartItem);
router.delete('/:userId/cart', authmiddleware_1.authMiddleware, cartcontroller_1.removeCartItem);
router.delete('/:userId/cart/clear', authmiddleware_1.authMiddleware, cartcontroller_1.clearCart);
exports.default = router;