import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';

import productController from '../../../src/controllers/product.controller';
import productMock from '../../mocks/product.mock';
import productService from '../../../src/services/product.service';
import { ServiceResponse } from '../../../src/types/ServiceResponde';
import { ProductResponse } from '../../../src/types/Product';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  describe('Ao receber um name inválido, retorna erros', function () {
    it('name is required', async function () {
      // Arrange
      req.body  = productMock.noNameReq;
      const serviceResponse: ServiceResponse<ProductResponse> = { status: 'INVALID_DATA', data: productMock.nameRequiredError.data };
      sinon.stub(productService, 'createProduct').resolves(serviceResponse);
      // Act
      await productController.create(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith(productMock.nameRequiredError.data);
    });
    it('name must be a string', async function () {
      // Arrange
      req.body  = productMock.noStringNameReq;
      const serviceResponse: ServiceResponse<ProductResponse> = { status: 'UNPROCESSABLE_ENTITY', data: productMock.nameIsStringError.data };
      sinon.stub(productService, 'createProduct').resolves(serviceResponse);
      // Act
      await productController.create(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith(productMock.nameIsStringError.data);
    });
    it('name length mustat least 3 characters long', async function () {
       // Arrange
       req.body  = productMock.invalidNameLengthReq;
       const serviceResponse: ServiceResponse<ProductResponse> = { status: 'UNPROCESSABLE_ENTITY', data: productMock.nameLengthError.data };
       sinon.stub(productService, 'createProduct').resolves(serviceResponse);
       // Act
       await productController.create(req, res);
       // Assert
       expect(res.status).to.have.been.calledWith(422);
       expect(res.json).to.have.been.calledWith(productMock.nameLengthError.data);
    });
  });
  describe('Ao receber um price inválido, retorna erros', function () {
    it('price is required', async function () {
      // Arrange
      req.body  = productMock.noPriceReq;
      const serviceResponse: ServiceResponse<ProductResponse> = { status: 'INVALID_DATA', data: productMock.priceRequiredError.data };
      sinon.stub(productService, 'createProduct').resolves(serviceResponse);
      // Act
      await productController.create(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith(productMock.priceRequiredError.data);
    });
    it('price must be a string', async function () {
      // Arrange
      req.body  = productMock.noStringPriceReq;
      const serviceResponse: ServiceResponse<ProductResponse> = { status: 'UNPROCESSABLE_ENTITY', data: productMock.priceIsStringError.data };
      sinon.stub(productService, 'createProduct').resolves(serviceResponse);
      // Act
      await productController.create(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith(productMock.priceIsStringError.data);
    });
    it('price length mustat least 3 characters long', async function () {
      // Arrange
      req.body  = productMock.invalidPriceLengthReq;
      const serviceResponse: ServiceResponse<ProductResponse> = { status: 'UNPROCESSABLE_ENTITY', data: productMock.priceLengthError.data };
      sinon.stub(productService, 'createProduct').resolves(serviceResponse);
      // Act
      await productController.create(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith(productMock.priceLengthError.data);
    });
  });
  describe('Ao receber um name e price válidos', function () {
    it('retorna o produto cadastrado com novo id', async function () {
      // Arrange
      req.body  = productMock.validReq;
      const serviceResponse: ServiceResponse<ProductResponse> = { status: 'SUCCESSFUL', data: productMock.successResponse.data };
      sinon.stub(productService, 'createProduct').resolves(serviceResponse);
      // Act
      await productController.create(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productMock.successResponse.data);
    });
  });
});
