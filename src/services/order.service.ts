import { OrderProductIds } from '../types/Order';
import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponde';

async function listAllOrders(): Promise<ServiceResponse<OrderProductIds[]>> {
  const orders = await OrderModel.findAll({
    include: [{ model: ProductModel,
      as: 'productIds',
      attributes: ['id'],
    }],
  });

  if (orders.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Nenhum produto cadstrado' } };
  }

  const orderProductIds = orders.map(({ dataValues }) => ({
    id: dataValues.id,
    userId: dataValues.userId,
    productIds: dataValues.productIds?.map((p) => p.id),
  }));
    
  return { status: 'SUCCESSFUL', data: orderProductIds };
}

export default {
  listAllOrders,
};
