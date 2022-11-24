import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Matches', () => {
  it('All Matches', async () => {
    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);
  });
});