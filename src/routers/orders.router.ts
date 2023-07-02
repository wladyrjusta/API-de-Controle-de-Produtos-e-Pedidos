import { Router } from 'express';

import orderController from '../controllers/order.controller';
import authMiddleware from '../middleware/auth.middleware';
import validateNewOrder from '../middleware/validateNewOrder';

const ordersRouter = Router();
const path = '/orders';

ordersRouter.get(path, orderController.listAll);
ordersRouter.use(authMiddleware.authMiddleware);
ordersRouter.use(validateNewOrder);
ordersRouter.post(path, orderController.create);

export default ordersRouter;
