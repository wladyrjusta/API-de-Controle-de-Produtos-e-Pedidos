const userIdRequiredError = { message: '"userId" is required' };

const userIdRequiredReq = { productIds: [1, 2] };

const userIdNumberError = { message: '"userId" must be a number' };

const userIdNumberReq = { productIds: [1, 2], userId: "1" };

const userNotFoundError = { message: '"userId" not found' };

const userNotFoundReq = { productIds: [1, 2], userId: 999 };

const productIdsRequiredError = { message: '"productIds" is required' };

const productIdsRequiredReq = { userId: 1 };

const productIdsArrayError = { message: '"productIds" must be an array' };

const productIdsArrayReq = { productIds: 1, userId: 999 };

const productIdsEmptyError = { message: '"productIds" must include only numbers' };

const productIdsEmptyReq = { productIds: [], userId: 999 };

const validNewOrderReq = { productIds: [1, 2], userId: 1 };

const newOrderSuccessReturn = {  userId: 1, productIds: [1, 2] };

const findAllOrdersProductsReturn = [
  {
    id: 1,
    userId: 2,
    productIds: [{ id: 1 }, { id: 2 }]
  },
  {
    id: 2,
    userId: 1,
    productIds: [{ id: 3 }, { id: 4}]
  }
];

const serviceOrdersProductsReturn = [
  {
    id: 1,
    userId: 2,
    productIds: [ 1, 2 ]
  },
  {
    id: 2,
    userId: 1,
    productIds: [ 3, 4]
  }
];

const findAllOrdersReturn = [
  {
    id: 1,
    userId: 2
  },
  {
    id: 2,
    userId: 1
  }
];

const createOrderReturn = { id: 1, userId: 1 };

export default {
  userIdNumberError,
  userIdRequiredError,
  userNotFoundError,
  userIdNumberReq,
  userNotFoundReq,
  userIdRequiredReq,
  productIdsArrayError,
  productIdsArrayReq,
  productIdsEmptyError,
  productIdsEmptyReq,
  productIdsRequiredError,
  productIdsRequiredReq,
  validNewOrderReq,
  newOrderSuccessReturn,
  findAllOrdersReturn,
  createOrderReturn,
  findAllOrdersProductsReturn,
  serviceOrdersProductsReturn,
};
