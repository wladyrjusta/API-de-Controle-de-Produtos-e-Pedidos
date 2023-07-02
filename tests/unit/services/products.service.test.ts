import { expect } from 'chai';
import sinon from 'sinon';

import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/product.mock';
import productService from '../../../src/services/product.service';

describe('ProductsService', function () {
  beforeEach(function () {
    sinon.restore();
  });
  describe('Função CreateProduct ao receber um name inválido, retorna erros', function () {
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
  describe('Função CreateProduct ao receber um price inválido, retorna erros', function () {
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
  describe('Função CreateProduct ao receber um name e price válidos', function () {
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
  describe('Função listAllProducts', function () {
    it('retorna um array com produtos cadastrados', async function () {
      // Arrange
      const mockFindAllReturn = productMock.findAllReturn.map((product) => ProductModel.build(product));
      sinon.stub(ProductModel, 'findAll').resolves(mockFindAllReturn);
      // Act
      const serviceResponse = await productService.listAllProducts();
      // Assert
      expect(serviceResponse.status).to.be.equal(productMock.successResponse.status);
      expect(serviceResponse.data).to.be.deep.equal(mockFindAllReturn);
    });
    it('retorna um erro caso não existam produtos cadastrados', async function () {
      // Arrange
      const sttusResponse = 'NOT_FOUND';
      sinon.stub(ProductModel, 'findAll').resolves([]);
      // Act
      const serviceResponse = await productService.listAllProducts();
      // Assert
      expect(serviceResponse.status).to.be.equal(sttusResponse);
      expect(serviceResponse.data).to.be.deep.equal({ message: 'Nenhum produto cadstrado' });
    });
  });
});
