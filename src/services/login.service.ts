import bcrypt from 'bcryptjs';

import UserModel from '../database/models/user.model';
import { Login } from '../types/Login';
import { ServiceResponse } from '../types/ServiceResponde';
import { Token } from '../types/Token';
import jwtUtil from '../utils/jwtUtil';

async function verifyLogin(loginCredentials: Login): Promise<ServiceResponse<Token>> {
  if (!loginCredentials.username || !loginCredentials.password) {
    return { status: 'INVALID_DATA', data: { message: '"username" and "password" are required' } };
  }

  const user = await UserModel.findOne({ where: { username: loginCredentials.username } });

  if (!user || !bcrypt.compareSync(loginCredentials.password, user.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const { id, username } = user.dataValues;

  const token = jwtUtil.sign({ id, username });

  return { status: 'SUCCESSFUL', data: { token } };
}

export default {
  verifyLogin,
};
