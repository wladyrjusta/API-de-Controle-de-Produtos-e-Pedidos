import ProductModel from '../database/models/product.model';
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

export default {
  createProduct,
};
