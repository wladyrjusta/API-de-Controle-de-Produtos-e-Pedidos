import { expect } from 'chai';
import sinon from 'sinon';

import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/product.mock';
import productService from '../../../src/services/product.service';

describe('ProductsService', function () {
  beforeEach(function () {
    sinon.restore();
  });
  describe('Ao receber um name inválido, retorna erros', function () {
    it('name is required', async function () {
      // Arrange
      const parameters = productMock.noNameReq;
      // Act
      const serviceResponse = await productService.createProduct(parameters);
      // Assert
      expect(serviceResponse.status).to.be.equal(productMock.nameRequiredError.status);
      expect(serviceResponse.data).to.be.deep.equal(productMock.nameRequiredError.data);
    });
    it('name must be a string', async function () {
      // Arrange
      const parameters = productMock.noStringNameReq;
      // Act
      const serviceResponse = await productService.createProduct(parameters);
      // Assert
      expect(serviceResponse.status).to.be.equal(productMock.nameIsStringError.status);
      expect(serviceResponse.data).to.be.deep.equal(productMock.nameIsStringError.data);
    });
    it('name length mustat least 3 characters long', async function () {
      // Arrange
      const parameters = productMock.invalidNameLengthReq;
      // Act
      const serviceResponse = await productService.createProduct(parameters);
      // Assert
      expect(serviceResponse.status).to.be.equal(productMock.nameLengthError.status);
      expect(serviceResponse.data).to.be.deep.equal(productMock.nameLengthError.data);
    });
  });
  describe('Ao receber um price inválido, retorna erros', function () {
    it('price is required', async function () {
      // Arrange
      const parameters = productMock.noPriceReq;
      // Act
      const serviceResponse = await productService.createProduct(parameters);
      // Assert
      expect(serviceResponse.status).to.be.equal(productMock.priceRequiredError.status);
      expect(serviceResponse.data).to.be.deep.equal(productMock.priceRequiredError.data);
    });
    it('price must be a string', async function () {
      // Arrange
      const parameters = productMock.noStringPriceReq;
      // Act
      const serviceResponse = await productService.createProduct(parameters);
      // Assert
      expect(serviceResponse.status).to.be.equal(productMock.priceIsStringError.status);
      expect(serviceResponse.data).to.be.deep.equal(productMock.priceIsStringError.data);
    });
    it('price length mustat least 3 characters long', async function () {
      // Arrange
      const parameters = productMock.invalidPriceLengthReq;
      // Act
      const serviceResponse = await productService.createProduct(parameters);
      // Assert
      expect(serviceResponse.status).to.be.equal(productMock.priceLengthError.status);
      expect(serviceResponse.data).to.be.deep.equal(productMock.priceLengthError.data);
    });
  });
  describe('Ao receber um name e price válidos', function () {
    it('retorna o produto cadastrado com novo id', async function () {
      // Arrange
      const parameters = productMock.validReq;
      const mockCreateProductReturn = ProductModel.build(productMock.productModelCreateReturn);
      sinon.stub(ProductModel, 'create').resolves(mockCreateProductReturn);
      // Act
      const serviceResponse = await productService.createProduct(parameters);
      // Assert
      expect(serviceResponse.status).to.be.equal(productMock.successResponse.status);
      expect(serviceResponse.data).to.be.deep.equal(productMock.successResponse.data);
    });
  });
});
