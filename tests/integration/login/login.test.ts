import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';

import app from '../../../src/app';
import loginMock from '../../mocks/login.mock';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () {
    sinon.restore();
  });
  it('ao não receber um username, retorne um erro', async function () {
    // Arrange
    const httpRequestBody = loginMock.noUserLoginReq;
    // Act
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(httpRequestBody);
    // Assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal(loginMock.noUsernamePasswordError.data);
  });
  it('ao não receber uma senha, retorne um erro', async function () {
    // Arrange
    const httpRequestBody = loginMock.noPasswordLoginReq;
    // Act
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(httpRequestBody);
    // Assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal(loginMock.noUsernamePasswordError.data);
  });  
  it('ao receber um username inválido/inexistente, retorne um erro', async function () {
    // Arrange
    const httpRequestBody = loginMock.unauthorizedUserLoginReq;
    sinon.stub(UserModel, 'findOne').resolves(null);
    // Act
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(httpRequestBody);
    // Assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal(loginMock.unauthorizedUserError.data);
  });
  it('ao receber um username válido e uma senha inválida, retorne um erro', async function () {
    // Arrange
    const httpRequestBody = loginMock.unauthorizedPasswordLoginReq;
    const mockFindOneReturn = UserModel.build(loginMock.userFromDb);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);
    // Act
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(httpRequestBody);
    // Assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal(loginMock.unauthorizedUserError.data);
  });
  it('ao receber um username e uma senha válidos, retorne um token de login', async function () {
    // Arrange
    const httpRequestBody = loginMock.validLoginReq;
    const mockFindOneReturn = UserModel.build(loginMock.userFromDb);
    sinon.stub(bcrypt, 'compareSync').resolves(true);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);
    // Act
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(httpRequestBody);
    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.have.key('token');
  });
});
