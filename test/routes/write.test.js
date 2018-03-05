const supertest = require('supertest');
const md5 = require('md5');

const server = require('../../src/index');
const models = require('../../models');

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
  it('take an url and store its md5 hash in db', (done) => {
    const longurl = 'http://longurl.com';
    const expectedHash = md5(longurl).substring(0, 6);
    models.shorturls.destroy({ truncate: true })
      .then(() => supertest(server.listener)
        .get('/write')
        .query({ longurl })
        .expect(200)
        .then(() => { }))
      .then(() => models.shorturls.findOne({
        where: {
          longurl,
        },
      }).then((res) => {
        // console.log(res);
        expect(res).toBeTruthy();
        expect(res.shorturl).toBe(expectedHash);
        done();
      }));
  });
});
