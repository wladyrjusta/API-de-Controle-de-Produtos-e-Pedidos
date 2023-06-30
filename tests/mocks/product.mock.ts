const nameRequired = { message: '"name" is required' };
const nameIsString = { message: '"name" must be a string' };
const nameLength = { message: '"name" length must be at least 3 characters long' };
const priceRequired = { message: '"price" is required' };
const priceIsString = { message: '"price" must be a string' };
const priceLength = { message: '"price" length must be at least 3 characters long' };

const nameRequiredError = { status: 'INVALID_DATA', data: nameRequired };
const priceRequiredError = { status: 'INVALID_DATA', data: priceRequired };
const nameIsStringError = { status: 'UNPROCESSABLE_ENTITY', data: nameIsString };
const priceIsStringError = { status: 'UNPROCESSABLE_ENTITY', data: priceIsString };
const nameLengthError = { status: 'UNPROCESSABLE_ENTITY', data: nameLength };
const priceLengthError = { status: 'UNPROCESSABLE_ENTITY', data: priceLength };

const noNameReq = {
  name: '',
  price: '30 peças de ouro',
  orderId: 4,
};

const noPriceReq = {
  name: 'Martelo de Thor',
  price: '',
  orderId: 4,
};

const invalidPriceLengthReq = {
  name: 'Martelo de Thor',
  price: '30',
  orderId: 4,
};

const invalidNameLengthReq = {
  name: 'Pe',
  price: '30 peças de ouro',
  orderId: 4,
};

const noStringNameReq = {
  name: true,
  price: '30 peças de ouro',
  orderId: 4,
};

const noStringPriceReq = {
  name: 'Martelo de Thor',
  price: 30,
  orderId: 4,
};

const validReq = {
  name: 'Martelo de Thor',
  price: '30 peças de ouro',
  orderId: 4,
};

const productModelCreateReturn = {
  id: 6,
  name: 'Martelo de Thor',
  price: '30 peças de ouro',
  orderId: 4,
};

const validProduct = {
  id: 6,
  name: 'Martelo de Thor',
  price: '30 peças de ouro',
};

const successResponse = { status: 'SUCCESSFUL', data: validProduct };

export default {
  validReq,
  noNameReq,
  noPriceReq,
  noStringNameReq,
  noStringPriceReq,
  nameIsStringError,
  nameLengthError,
  nameRequiredError,
  priceIsStringError,
  priceLengthError,
  priceRequiredError,
  invalidNameLengthReq,
  invalidPriceLengthReq,
  validProduct,
  successResponse,
  productModelCreateReturn,
};
