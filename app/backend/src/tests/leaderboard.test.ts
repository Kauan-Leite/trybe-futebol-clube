import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Leaderboard', () => {
  it('Leaderboard All', async () => {
    const response = await chai.request(app).get('/leaderboard');

    expect(response.status).to.be.equal(200);
  });

  it('Leaderboard Home', async () => {
    const response = await chai.request(app).get('/leaderboard/home');

    expect(response.status).to.be.equal(200);
  });

  it('Leaderboard Away', async () => {
    const response = await chai.request(app).get('/leaderboard/away');

    expect(response.status).to.be.equal(200);
  });
});