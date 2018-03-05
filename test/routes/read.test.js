const supertest = require('supertest');
const md5 = require('md5');

const server = require('../../src/index');
const models = require('../../models');

describe('The read route should', () => {
  it('take a short url and return the longurl if it exists in db', (done) => {
    const longurl = 'http://longurl.com';
    const shorturl = md5(longurl).substring(0, 6);
    models.shorturls.upsert({
      longurl, shorturl,
    }).then(() => supertest(server.listener)
      .get('/read')
      .query({ shorturl })
      .expect(200)
      .then((res) => {
        expect(res.body.longurl).toBe(longurl);
        done();
      }));
  });
  it('take a short url and return empty string if it does not exist', (done) => {
    const longurl = 'http://doesnotexist.com';
    const shorturl = md5(longurl).substring(0, 6);
    supertest(server.listener)
      .get('/read')
      .query({ shorturl })
      .expect(200)
      .then((res) => {
        expect(res.body.longurl).toBe('');
        done();
      });
  });
});
