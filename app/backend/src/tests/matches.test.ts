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
  const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY5MjQ2ODIyfQ.RsWymztrAcokKgLiEf5-pjvhT172FmTL3RZ4fHRi42I';

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

  it('Create Match | Valid Token', async() => {
    const response = await chai
    .request(app)
    .post('/matches')
    .set({'authorization': validToken})
    .send({
      homeTeam: 12,
      awayTeam: 4,
      homeTeamGoals: 4,
      awayTeamGoals: 0
    });

    expect(response.status).to.be.equal(201);
  });

  it('Create Match | Invalid Token === string', async() => {
    const response = await chai
    .request(app)
    .post('/matches')
    .set({'authorization': 'invalid_token'})
    .send({
      homeTeam: 12,
      awayTeam: 4,
      homeTeamGoals: 4,
      awayTeamGoals: 0
    });

    expect(response.status).to.be.equal(401);
  });

  it('Create Match | Invalid Token !== string', async() => {
    const response = await chai
    .request(app)
    .post('/matches')
    .send({
      homeTeam: 12,
      awayTeam: 4,
      homeTeamGoals: 4,
      awayTeamGoals: 0
    });

    expect(response.status).to.be.equal(401);
  });

  it('Update Match', async() => {
    const newMatch = await chai
    .request(app)
    .post('/matches')
    .set({'authorization': validToken})
    .send({
      homeTeam: 12,
      awayTeam: 4,
      homeTeamGoals: 4,
      awayTeamGoals: 0
    });

    const response = await chai.request(app).patch(`/matches/${newMatch.body.id}/finish`);

    expect(response.status).to.be.equal(200);
    expect(response.body.message).to.be.equal('Finished');
  });

  it('Create Match | Equal Team', async() => {
    const response = await chai
    .request(app)
    .post('/matches')
    .set({'authorization': validToken})
    .send({
      homeTeam: 12,
      awayTeam: 12,
      homeTeamGoals: 0,
      awayTeamGoals: 0
    });

    expect(response.status).to.be.equal(422);
  });
});