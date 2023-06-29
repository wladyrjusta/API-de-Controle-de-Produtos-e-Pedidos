import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';

import { ServiceResponse } from '../../../src/types/ServiceResponde';
import loginController from '../../../src/controllers/login.controller';
import loginService from '../../../src/services/login.service';
import loginMock from '../../mocks/login.mock';
import { Token } from '../../../src/types/Token';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  it('Ao não receber um username retorna erro', async function () {
    // Arrange
    req.body = loginMock.noUserLoginReq;
    const serviceResponse: ServiceResponse<Token> = { status: 'INVALID_DATA', data: loginMock.noUsernamePasswordError.data };;
    sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);
    // Act
    await loginController.login(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(loginMock.noUsernamePasswordError.data);
  });
 it('Ao não receber uma senha retorna erro', async function () {
    // Arrange
    req.body = loginMock.noPasswordLoginReq;
    const serviceResponse: ServiceResponse<Token> = { status: 'INVALID_DATA', data: loginMock.noUsernamePasswordError.data };;
    sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);
    // Act
    await loginController.login(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(loginMock.noUsernamePasswordError.data);
  });
  it('Ao receber um username inexistente no banco de dados retorna erro', async function () {
    // Arrange
    req.body = loginMock.unauthorizedUserError;
    const serviceResponse: ServiceResponse<Token> = { status: 'UNAUTHORIZED', data: loginMock.unauthorizedUserError.data };;
    sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);
    // Act
    await loginController.login(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith(loginMock.unauthorizedUserError.data);
  });
  it('Ao receber um username válido e uma senha inválida retorna erro', async function () {
    // Arrange
    req.body = loginMock.unauthorizedPasswordLoginReq;
    const serviceResponse: ServiceResponse<Token> = { status: 'UNAUTHORIZED', data: loginMock.unauthorizedUserError.data };
    sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);
    // Act
    await loginController.login(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith(loginMock.unauthorizedUserError.data);
  });
  it('Ao receber um username e senha válidos, retorna um token', async function () {
    // Arrange
    req.body = loginMock.validLoginReq;
    const serviceResponse: ServiceResponse<Token> = { status: 'SUCCESSFUL', data: loginMock.successLoginResponse.data };;
    sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);
    // Act
    await loginController.login(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(loginMock.successLoginResponse.data);
  });
});
