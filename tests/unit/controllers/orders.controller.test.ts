import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';

import orderService from '../../../src/services/order.service';
import orderController from '../../../src/controllers/order.controller';
import orderMock from '../../mocks/order.mock';
import validateNewOrder from '../../../src/middleware/validateNewOrder';
import { ServiceResponse } from '../../../src/types/ServiceResponde';
import { CreateOrderReturn, OrderProductIds } from '../../../src/types/Order';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;
  const next = sinon.stub();

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    next.reset();
    sinon.restore();
  });
  describe('A Função listAll recebendo parâmetros válidos', function () {
    it('retorna os dados userId do pedido cadastrado e um array com id dos produtos atualizados e status 200', async function () {
      // Arrange
      const serviceResponse: ServiceResponse<OrderProductIds[]> = { status: 'SUCCESSFUL', data: orderMock.serviceOrdersProductsReturn };
      sinon.stub(orderService, 'listAllOrders').resolves(serviceResponse);
      // Act
      await orderController.listAll(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(orderMock.serviceOrdersProductsReturn);
    });
    it('retorna mensagem de erro com status 404', async function () {
      // Arrange
      const serviceResponse: ServiceResponse<OrderProductIds[]> = { status: 'NOT_FOUND', data:{ message: 'Nenhum produto cadstrado' } };
      sinon.stub(orderService, 'listAllOrders').resolves(serviceResponse);
      // Act
      await orderController.listAll(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Nenhum produto cadstrado' });
    });
  });
  describe('A Função create recebendo parâmetros válidos', function () {
    it('retorna os dados userId do pedido cadastrado e um array com id dos produtos atualizadose status 201', async function () {
       // Arrange
       req.body = orderMock.validNewOrderReq;
       const serviceResponse: ServiceResponse<CreateOrderReturn> = { status: 'SUCCESSFUL', data: orderMock.newOrderSuccessReturn };
       sinon.stub(orderService, 'createOrders').resolves(serviceResponse);
       // Act
       await orderController.create(req, res);
       // Assert
       expect(res.status).to.have.been.calledWith(201);
       expect(res.json).to.have.been.calledWith(orderMock.newOrderSuccessReturn);
    });
  });
  describe('A Função createOrders recebendo recebendo parâmetros inválidos', function () {
     it('retorna erro caso  não possuir o campo "userId"', async function () {
       // Arrange
       req.body = orderMock.userIdRequiredReq;
       const serviceResponse: ServiceResponse<CreateOrderReturn> = { status: 'INVALID_DATA', data: orderMock.userIdRequiredError };
       sinon.stub(orderService, 'createOrders').resolves(serviceResponse);
       // Act
       await validateNewOrder(req, res, next);
       // Assert
       expect(res.status).to.have.been.calledWith(400);
       expect(res.json).to.have.been.calledWith(orderMock.userIdRequiredError);
    });
    it('retorna erro se o campo "userId" não for do tipo number', async function () {
      // Arrange
      req.body = orderMock.userIdNumberReq;
      const serviceResponse: ServiceResponse<CreateOrderReturn> = { status: 'UNPROCESSABLE_ENTITY', data: orderMock.userIdNumberError };
      sinon.stub(orderService, 'createOrders').resolves(serviceResponse);
      // Act
      await validateNewOrder(req, res, next);
      // Assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith(orderMock.userIdNumberError);
    });
    it('retorna erro se o campo "userId" não for um usuário existente', function () {
      // Arrange
      // Act
      // Assert
    });
    it('retorna erro se o corpo da requisição não possuir o campo "productIds"', async function () {
      // Arrange
      req.body = orderMock.productIdsRequiredReq;
      const serviceResponse: ServiceResponse<CreateOrderReturn> = { status: 'INVALID_DATA', data: orderMock.productIdsRequiredError };
      sinon.stub(orderService, 'createOrders').resolves(serviceResponse);
      // Act
      await validateNewOrder(req, res, next);
      // Assert
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith(orderMock.productIdsRequiredError);
    });
    it('retorna erro se o valor do campo "productIds" não for um array', async function () {
      // Arrange
      req.body = orderMock.productIdsArrayReq;
      const serviceResponse: ServiceResponse<CreateOrderReturn> = { status: 'UNPROCESSABLE_ENTITY', data: orderMock.productIdsArrayError };
      sinon.stub(orderService, 'createOrders').resolves(serviceResponse);
      // Act
      await orderController.create(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith(orderMock.productIdsArrayError);
    });
    it('retorna erro se o campo "productIds" possuir um array vazio', function () {
      // Arrange
      // Act
      // Assert
    });
    it('retorna next se receber todos os parâmetros corretamente', async function () {
      // Arrange
      req.body = orderMock.validNewOrderReq;
      const serviceResponse: ServiceResponse<CreateOrderReturn> = { status: 'SUCCESSFUL', data: orderMock.newOrderSuccessReturn };
      sinon.stub(orderService, 'createOrders').resolves(serviceResponse);
      // Act
      await validateNewOrder(req, res, next);
      // Assert
      expect(next).to.have.been.called;
    });
  });
});
