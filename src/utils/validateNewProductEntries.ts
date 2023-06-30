import { ServiceResponse } from '../types/ServiceResponde';
import { ProductParams } from '../types/Product';

const nameRequired = { message: '"name" is required' };
const nameIsString = { message: '"name" must be a string' };
const nameLength = { message: '"name" length must be at least 3 characters long' };
const priceRequired = { message: '"price" is required' };
const priceIsString = { message: '"price" must be a string' };
const priceLength = { message: '"price" length must be at least 3 characters long' };

function validateNewProductName(product: ProductParams): ServiceResponse<null> {
  if (!product.name) {
    return { status: 'INVALID_DATA', data: nameRequired };
  }
  if (typeof product.name !== 'string') {
    return { status: 'UNPROCESSABLE_ENTITY', data: nameIsString };
  }
  if (product.name.length < 3) {
    return { status: 'UNPROCESSABLE_ENTITY', data: nameLength };
  }

  return { status: 'SUCCESSFUL', data: null };
}

function validateNewProductPrice(product: ProductParams): ServiceResponse<null> {
  if (!product.price) {
    return { status: 'INVALID_DATA', data: priceRequired };
  }
  if (typeof product.price !== 'string') {
    return { status: 'UNPROCESSABLE_ENTITY', data: priceIsString };
  }
  if (product.price.length < 3) {
    return { status: 'UNPROCESSABLE_ENTITY', data: priceLength };
  }

  return { status: 'SUCCESSFUL', data: null };
}

export default {
  validateNewProductName,
  validateNewProductPrice,
};
