import ProductModel, { ProductSequelizeModel } from '../database/models/product.model';
import { ProductResponse, ProductParams } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponde';
import validateNewProductEntries from '../utils/validateNewProductEntries';

async function createProduct(product: ProductParams): Promise<ServiceResponse<ProductResponse>> {
  const nameError = validateNewProductEntries.validateNewProductName(product);
  const priceError = validateNewProductEntries.validateNewProductPrice(product);

  if (nameError.data) return nameError;
  if (priceError.data) return priceError;

  const newProduct = await ProductModel.create(product);

  return { status: 'SUCCESSFUL',
    data: {
      id: newProduct.dataValues.id,
      name: newProduct.dataValues.name,
      price: newProduct.dataValues.price },
  };
}

async function listAllProducts(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const products = await ProductModel.findAll();

  if (products.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Nenhum produto cadstrado' } };
  }

  return { status: 'SUCCESSFUL', data: products };
}

export default {
  createProduct,
  listAllProducts,
};
