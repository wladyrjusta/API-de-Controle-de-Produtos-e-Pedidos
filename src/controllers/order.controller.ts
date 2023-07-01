import { Request, Response } from 'express';

import mapStatusHTTP from '../utils/mapStatusHTTP';
import orderService from '../services/order.service';

async function listAll(_req: Request, res: Response) {
  const orders = await orderService.listAllOrders();

  if (orders.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(orders.status)).json(orders.data);
  }

  return res.status(200).json(orders.data);
}

async function create(req: Request, res: Response) {
  const { userId, productIds } = req.body;

  const serviceResponse = await orderService.createOrders(productIds, userId);

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  return res.status(201).json(serviceResponse.data);
}

export default {
  listAll,
  create,
};
