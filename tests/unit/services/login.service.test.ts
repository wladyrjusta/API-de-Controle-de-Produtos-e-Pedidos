import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';

import UserModel from '../../../src/database/models/user.model';
import loginService from '../../../src/services/login.service';
import loginMock from '../../mocks/login.mock';

describe('LoginService', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Ao não receber um username retorna erro', async function () {
    // Arrange
    const parameters = loginMock.noUserLoginReq;
    // Act
    const serviceResponse = await loginService.verifyLogin(parameters);
    // Assert
    expect(serviceResponse.status).to.be.equal(loginMock.noUsernamePasswordError.status);
    expect(serviceResponse.data).to.be.deep.equal(loginMock.noUsernamePasswordError.data);
  });
  it('Ao não receber uma senha retorna erro', async function () {
    const parameters = loginMock.noPasswordLoginReq;
    // Act
    const serviceResponse = await loginService.verifyLogin(parameters);
    // Assert
    expect(serviceResponse.status).to.be.equal(loginMock.noUsernamePasswordError.status);
    expect(serviceResponse.data).to.be.deep.equal(loginMock.noUsernamePasswordError.data);
  });
  it('Ao receber um username inexistente no banco de dados retorna erro', async function () {
    // Arrange
    sinon.stub(UserModel, 'findOne').resolves(null);
    // Act
    const serviceResponse = await loginService.verifyLogin(loginMock.unauthorizedUserLoginReq);
    // Assert
    expect(serviceResponse.status).to.be.equal(loginMock.unauthorizedUserError.status);
    expect(serviceResponse.data).to.be.deep.equal(loginMock.unauthorizedUserError.data);
  });
  it('Ao receber um usuário válido e uma senha inválida retorna erro', async function () {
    // Arrange
    const mockFindOneReturn = UserModel.build(loginMock.userFromDb);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);
    // Act
    const serviceResponse = await loginService.verifyLogin(loginMock.unauthorizedPasswordLoginReq);    
    // Assert
    expect(serviceResponse.status).to.be.equal(loginMock.unauthorizedUserError.status);
    expect(serviceResponse.data).to.be.deep.equal(loginMock.unauthorizedUserError.data);
  });
  it('Ao receber um username e senha válidos, retorna um token', async function () {
    // Arrange
    const mockFindOneReturn = UserModel.build(loginMock.userFromDb);
    sinon.stub(bcrypt, 'compareSync').resolves(true);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);
    // Act
    const serviceResponse = await loginService.verifyLogin(loginMock.validLoginReq);
    // Assert
    expect(serviceResponse.status).to.be.equal(loginMock.successLoginResponse.status);
    expect(serviceResponse.data).to.have.key('token');
  });
});
