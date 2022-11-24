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

  it('In Progress | true', async() => {
    const response = await chai.request(app).get('/matches?inProgress=true');

    const haveInProgress = response.text.includes('true');
    const haveFinish = response.text.includes('false');

    expect(response.status).to.be.equal(200);

    expect(haveInProgress).to.be.equal(true);
    expect(haveFinish).to.be.equal(false);
  });

  it('In Progress | false', async() => {
    const response = await chai.request(app).get('/matches?inProgress=false');

    const haveInProgress = response.text.includes('true');
    const haveFinish = response.text.includes('false');
     
    expect(response.status).to.be.equal(200);

    expect(haveInProgress).to.be.equal(false);
    expect(haveFinish).to.be.equal(true);
  });
});