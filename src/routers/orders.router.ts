import { Router } from 'express';

import orderController from '../controllers/order.controller';

const ordersRouter = Router();
const path = '/orders';

ordersRouter.get(path, orderController.listAll);

export default ordersRouter;
