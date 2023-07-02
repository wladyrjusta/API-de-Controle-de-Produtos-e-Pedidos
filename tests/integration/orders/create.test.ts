import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import OrderModel from '../../../src/database/models/order.model'; 
import ProductModel from '../../../src/database/models/product.model';
import orderMock from '../../mocks/order.mock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /orders', function () {
  const path = '/orders';
  beforeEach(function () {
    sinon.restore();
  });
  describe('POST /orders', function () {
    it('retorna erro se não houver token', async function () {
      // Arrange
      const mockOrderCreateReturn = OrderModel.build(orderMock.createOrderReturn);
      sinon.stub(OrderModel, 'create').resolves(mockOrderCreateReturn);
      sinon.stub(ProductModel, 'update').resolves([1]);
      // Act
      const httpResponse = await chai
      .request(app)
      .post(path)
      .send(mockOrderCreateReturn)
      // Assert
      expect(httpResponse.status).to.be.equal(401);
      expect(httpResponse.body).to.be.deep.equal({ message: 'Token not found' });      
    });
    it('retorna erro se token for inválido', async function () {
      // Arrange
      const mockOrderCreateReturn = OrderModel.build(orderMock.createOrderReturn);
      sinon.stub(OrderModel, 'create').resolves(mockOrderCreateReturn);
      sinon.stub(ProductModel, 'update').resolves([1]);
      // Act
      const httpResponse = await chai
      .request(app)
      .post(path)
      .send(mockOrderCreateReturn)
      .set('Authorization', 'genericToken');
      // Assert
      expect(httpResponse.status).to.be.equal(401);
      expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid token' });
    });
  });
});
