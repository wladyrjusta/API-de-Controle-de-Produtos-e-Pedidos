import { OrderProductIds, CreateOrderReturn } from '../types/Order';
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

async function createOrders(
  productIds: number[],
  userId: number,
): Promise<ServiceResponse<CreateOrderReturn>> {
  const newOrder = await OrderModel.create({ userId }); 

  const updateProducts = productIds
    .map(async (proId) => {
      const { id } = newOrder.dataValues;
      
      return ProductModel
        .update({ orderId: id }, { where: { id: proId }, fields: ['orderId'] });
    });

  await Promise.all(updateProducts);

  return { status: 'SUCCESSFUL',
    data: {
      userId,
      productIds,
    } };
}

export default {
  listAllOrders,
  createOrders,
};
