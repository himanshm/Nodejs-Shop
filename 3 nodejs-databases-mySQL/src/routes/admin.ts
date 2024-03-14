import { Router, Request, Response, NextFunction } from 'express';
import {
  getAddProducts,
  getEditProduct,
  getProducts,
  postDeleteProduct,
  postEditProduct,
} from '../controllers/admin';
import { postAddProduct } from '../controllers/admin';

const router = Router();

router.get('/add-product', getAddProducts);
router.get('/products', getProducts);

router.post('/add-product', postAddProduct);

router.get('/edit-product/:productId', getEditProduct);

router.post('/edit-product', postEditProduct);

router.post('/delete-product', postDeleteProduct);

export default router;
