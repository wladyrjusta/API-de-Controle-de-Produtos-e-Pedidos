const noUsernamePasswordError = { status: 'INVALID_DATA', data: { message: '"username" and "password" are required' } };

const unauthorizedUserError = { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tq4r3pJ5zS8PxGiP7U8193Y0PX_ClokT6XgylrT9y-o';

const successLoginResponse = { status: 'SUCCESSFUL', data: { token } };

const noUserLoginReq = { username: '', password: 'terrível' };

const noPasswordLoginReq = { username: 'Hagar', password: '' };

const validLoginReq = { username: 'Hagar', password: 'terrível' };

const unauthorizedUserLoginReq = { username: 'Thor', password: 'terrível' };

const unauthorizedPasswordLoginReq = { username: 'Hagar', password: 'senha-incorreta' };

const userFromDb = {
  username: 'Hagar',
  vocation: 'Guerreiro',
  level: 10,
  password: 'terrível'
};

export default {
  noUsernamePasswordError,
  noPasswordLoginReq,
  noUserLoginReq,
  unauthorizedUserError,
  unauthorizedPasswordLoginReq,
  unauthorizedUserLoginReq,
  validLoginReq,
  successLoginResponse,
  userFromDb,
};
