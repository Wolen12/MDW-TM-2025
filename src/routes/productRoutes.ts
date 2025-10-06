import express from 'express';
import { CreateProductDto } from '../dto/createProductDto';
import  validationMiddleware  from '../Middleware/middleware';
const router = express.Router();
import { authMiddleware } from '../Middleware/authMiddleware';

import {
  getAllProducts,
  getProductByName,
  updateProduct,
  deleteProduct,
  createProduct
} from '../controllers/productcontroller';

router.get('/', authMiddleware ,getAllProducts);
router.get('/:name',authMiddleware, getProductByName);
router.put('/:id', authMiddleware,updateProduct);
router.delete('/:id',authMiddleware ,deleteProduct);
router.post('/', validationMiddleware(CreateProductDto), createProduct);
export const productRoutes = router;
export default router;