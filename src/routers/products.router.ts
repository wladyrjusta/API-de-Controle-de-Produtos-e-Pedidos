import { Router } from 'express';

import productController from '../controllers/product.controller';

const productsRouter = Router();
const path = '/products';

productsRouter.post(path, productController.create);
productsRouter.get(path, productController.listAll);

export default productsRouter;
