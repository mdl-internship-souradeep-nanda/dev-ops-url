const supertest = require('supertest');
const md5 = require('md5');

const server = require('../../src/index');

describe('The write route should', () => {
  it('take an url and return its md5 hash', (done) => {
    const longurl = 'http://longurl.com';
    const expectedHash = md5(longurl).substring(0, 6);
    supertest(server.listener)
      .get('/write')
      .query({ longurl })
      .expect(200)
      .then((res) => {
        const { shorturl } = res.body;
        expect(shorturl).toBe(expectedHash);
        done();
      });
  });
});
