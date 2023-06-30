import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import productService from '../../../src/services/product.service';
import productMock from '../../mocks/product.mock';
import app from '../../../src/app';
import { ServiceResponse } from '../../../src/types/ServiceResponde';
import { ProductResponse } from '../../../src/types/Product';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () {
    sinon.restore();
  });
  describe('Ao receber um name inválido, retorna erros', function () {
    it('name is required', async function () {
      // Arrange
      const httpRequestBody = productMock.noNameReq;
      // Act
      const httpResponse = await chai
        .request(app)
        .post('/products')
        .send(httpRequestBody);
      // Assert
      expect(httpResponse.status).to.be.equal(400);
      expect(httpResponse.body).to.be.deep.equal(productMock.nameRequiredError.data);
    });
    it('name must be a string', async function () {
      // Arrange
      const httpRequestBody = productMock.noStringNameReq;
      // Act
      const httpResponse = await chai
        .request(app)
        .post('/products')
        .send(httpRequestBody);
      // Assert
      expect(httpResponse.status).to.be.equal(422);
      expect(httpResponse.body).to.be.deep.equal(productMock.nameIsStringError.data);
    });
    it('name length mustat least 3 characters long', async function () {
      // Arrange
      const httpRequestBody = productMock.invalidNameLengthReq;
      // Act
      const httpResponse = await chai
        .request(app)
        .post('/products')
        .send(httpRequestBody);
      // Assert
      expect(httpResponse.status).to.be.equal(422);
      expect(httpResponse.body).to.be.deep.equal(productMock.nameLengthError.data);
    });
  });
  describe('Ao receber um price inválido, retorna erros', function () {
    it('price is required', async function () {
      // Arrange
      const httpRequestBody = productMock.noPriceReq;
      // Act
      const httpResponse = await chai
        .request(app)
        .post('/products')
        .send(httpRequestBody);
      // Assert
      expect(httpResponse.status).to.be.equal(400);
      expect(httpResponse.body).to.be.deep.equal(productMock.priceRequiredError.data);
    });
    it('price must be a string', async function () {
      // Arrange
      const httpRequestBody = productMock.noStringPriceReq;
      // Act
      const httpResponse = await chai
        .request(app)
        .post('/products')
        .send(httpRequestBody);
      // Assert
      expect(httpResponse.status).to.be.equal(422);
      expect(httpResponse.body).to.be.deep.equal(productMock.priceIsStringError.data);
    });
    it('price length mustat least 3 characters long', async function () {
      // Arrange
      const httpRequestBody = productMock.invalidPriceLengthReq;
      // Act
      const httpResponse = await chai
        .request(app)
        .post('/products')
        .send(httpRequestBody);
      // Assert
      expect(httpResponse.status).to.be.equal(422);
      expect(httpResponse.body).to.be.deep.equal(productMock.priceLengthError.data);
    });
  });
  describe('Ao receber um name e price válidos', function () {
    it('retorna o produto cadastrado com novo id', async function () {
      // Arrange
      const httpRequestBody = productMock.validReq;
      const serviceResponse: ServiceResponse<ProductResponse> = { status: 'SUCCESSFUL', data: productMock.successResponse.data };
      sinon.stub(productService, 'createProduct').resolves(serviceResponse);
      // Act
      const httpResponse = await chai
        .request(app)
        .post('/products')
        .send(httpRequestBody);
      // Assert
      expect(httpResponse.status).to.be.equal(201);
      expect(httpResponse.body).to.be.deep.equal(productMock.successResponse.data);
    });
  });
});
