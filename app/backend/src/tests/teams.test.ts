import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teams', () => {
  it('All Teams', async () => {
    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
  });

  it('Team By ID | Valid', async () => {
    const response = await chai.request(app).get('/teams/12');

    expect(response.status).to.be.equal(200);
  });

  it('Team By ID | Invalid', async () => {
    const response = await chai.request(app).get('/teams/999');

    expect(response.status).to.be.equal(404);
  });
});