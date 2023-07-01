import { ServiceResponse } from '../types/ServiceResponde';
import UserModel from '../database/models/user.model';

const userIdRequired = { message: '"userId" is required' };
const userIdNumber = { message: '"userId" must be a number' };
const userNotFound = { message: '"userId" not found' };
const productIdsRequired = { message: '"productIds" is required' };
const productIdsArray = { message: '"productIds" must be an array' };
const productIdsEmpty = { message: '"productIds" must include only numbers' };

async function validateUserId(userId: number): Promise<ServiceResponse<null>> {
  if (!userId) {
    return { status: 'INVALID_DATA', data: userIdRequired };
  }
  if (typeof userId !== 'number') {
    return { status: 'UNPROCESSABLE_ENTITY', data: userIdNumber };
  }
  const user = await UserModel.findOne({ where: { id: userId } });

  if (!user) return { status: 'NOT_FOUND', data: userNotFound };

  return { status: 'SUCCESSFUL', data: null };
}

function validateProductIds(productIds: number[]): ServiceResponse<null> {
  if (!productIds) {
    return { status: 'INVALID_DATA', data: productIdsRequired };
  }
  if (typeof productIds !== 'object') {
    return { status: 'UNPROCESSABLE_ENTITY', data: productIdsArray };
  }
  if (productIds.length === 0) {
    return { status: 'UNPROCESSABLE_ENTITY', data: productIdsEmpty };
  }

  return { status: 'SUCCESSFUL', data: null };
}

export default {
  validateProductIds,
  validateUserId,
};
