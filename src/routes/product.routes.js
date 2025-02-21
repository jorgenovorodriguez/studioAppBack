import { Router } from 'express';
import getProductsController from '../controllers/products/getProducts.controller.js';
import getAvailability from '../controllers/products/getAvailability.controller.js';

const router = Router();

router.get('/catalog', getProductsController);
router.get('/:productId/availability', getAvailability);

export default router;
