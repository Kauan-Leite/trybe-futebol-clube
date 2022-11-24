import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Login', () => {
  it('Invalid Inputs', async () => {
    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
    });

    expect(response.status).to.be.equal(400);
  });

  it('Login Invalido', async () => {
    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'wrong_pass',
    });

    expect(response.status).to.be.equal(401);
  });

  it('Login Válido', async () => {
    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    expect(response.status).to.be.equal(200);
  });
});

describe('Token', () => {
  it('Invalid Token !== string', async() => {
    const response = await chai.request(app).get('/login/validate');

    expect(response.status).to.be.equal(401);
  });

  it('Invalid Token === string', async() => {
    const invalidToken = 'token_invalid_but_is_string';

    const response = await chai.request(app).get('/login/validate').set({
      'authorization': invalidToken,
    });

    expect(response.status).to.be.equal(401);
  });

  it('Valid Token', async () => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY5MjQ2ODIyfQ.RsWymztrAcokKgLiEf5-pjvhT172FmTL3RZ4fHRi42I';

    const response = await chai.request(app).get('/login/validate').set({
      'authorization': validToken,
    });
    
    expect(response.status).to.be.equal(200);
  })
})