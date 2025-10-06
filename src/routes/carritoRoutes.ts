import express from 'express';
import { authMiddleware } from '../Middleware/authMiddleware';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from '../controllers/cartcontroller';

const router = express.Router();

router.use(authMiddleware);

router.get('/:userId/cart',authMiddleware, getCart);
router.post('/:userId/cart',authMiddleware, addToCart);
router.put('/:userId/cart',authMiddleware, updateCartItem);
router.delete('/:userId/cart',authMiddleware, removeCartItem);
router.delete('/:userId/cart/clear',authMiddleware, clearCart);

export default router;