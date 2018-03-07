const supertest = require('supertest');

const server = require('../../src/index');

describe('The ping route should', () => {
  it('return pong', (done) => {
    supertest(server.listener)
      .get('/ping')
      .expect(200)
      .then((res) => {
        expect(res.text).toBe('pong');
        done();
      });
  });
});
