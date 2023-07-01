import { Request, Response, NextFunction } from 'express';
import validateNewOrderParams from '../utils/validateNewOrderParams';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function validateNewOrder(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  const { userId, productIds } = req.body;

  const userError = await validateNewOrderParams.validateUserId(userId);
  const productIdsError = validateNewOrderParams.validateProductIds(productIds);

  if (userError.data) {
    return res.status(mapStatusHTTP(userError.status)).json(userError.data);
  }

  if (productIdsError.data) {
    return res.status(mapStatusHTTP(productIdsError.status)).json(productIdsError.data);
  }

  next();
}

export default validateNewOrder;
