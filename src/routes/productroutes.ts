import express from 'express';
import { CreateProductDto } from '../dto/createProductDto.ts';
import  validationMiddleware  from '../Middleware/middleware.ts';
const router = express.Router();

import {
  getAllProducts,
  getProductByName,
  updateProduct,
  deleteProduct,
  createProduct
} from '../controllers/productcontroller.ts';

router.get('/', getAllProducts);
router.get('/:name', getProductByName);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/', validationMiddleware(CreateProductDto), createProduct);
export const productRoutes = router;
export default router;