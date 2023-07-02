import { expect } from 'chai';
import sinon from 'sinon';

import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import orderMock from '../../mocks/order.mock';
import orderService from '../../../src/services/order.service';

describe('OrdersService', function () {
  beforeEach(function () {
    sinon.restore();
  });
  describe('A Função createOrders recebendo parâmetros válidos', function () {
    it('retorna os dados userId do pedido cadastrado e um array com id dos produtos atualizados', async function () {
      // Arrange
      const mockOrderCreateReturn = OrderModel.build(orderMock.createOrderReturn);
      sinon.stub(OrderModel, 'create').resolves(mockOrderCreateReturn);
      sinon.stub(ProductModel, 'update').resolves([1]);
      // Act
      const serviceResponse = await orderService.createOrders(orderMock.validNewOrderReq.productIds, orderMock.validNewOrderReq.userId);
      // Assert
      expect(serviceResponse.status).to.be.equal('SUCCESSFUL');
      expect(serviceResponse.data).to.be.deep.equal(orderMock.newOrderSuccessReturn);
    });
  });
  describe('A Função listAllOrders', function () {
    it('retorna um array com todas as orders e seus respectivos productIds', async function () {
      // Arrange
      const mockOrderFindAllReturn = orderMock.findAllOrdersProductsReturn.map((order) => OrderModel.build(order, {
        include: [{ model: ProductModel,
          as: 'productIds',
          attributes: ['id'],
        }],
      }));
      sinon.stub(OrderModel, 'findAll').resolves(mockOrderFindAllReturn);
      // Act
      const serviceResponse = await orderService.listAllOrders();
      
      // Assert
      expect(serviceResponse.status).to.be.equal('SUCCESSFUL');
      expect(serviceResponse.data).to.be.deep.equal(orderMock.serviceOrdersProductsReturn);
    });
    it('retorna erro caso nenhum produto cadastrado', async function () {
      // Arrange
      sinon.stub(OrderModel, 'findAll').resolves([]);
      // Act
      const serviceResponse = await orderService.listAllOrders();
      
      // Assert
      expect(serviceResponse.status).to.be.equal('NOT_FOUND');
      expect(serviceResponse.data).to.be.deep.equal({ message: 'Nenhum produto cadstrado' });
    });
  });
});
