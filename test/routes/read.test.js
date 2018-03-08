const supertest = require('supertest');
const md5 = require('md5');

const server = require('../../src/index');
const models = require('../../models');

const {
  storeIntoRedis,
  redisFlushAll,
} = require('../../src/helpers/redis-helpers');

describe('The read route should take short url and return long url when', () => {
  it('the url is in redis store', (done) => {
    const longurl = 'http://longurl.com';
    const shorturl = md5(longurl).substring(0, 6);
    redisFlushAll()
      .then(() => storeIntoRedis(shorturl, longurl))
      .then(() => supertest(server.listener)
        .get('/read')
        .query({ shorturl })
        .expect(200)
        .then((res) => {
          expect(res.body.longurl).toBe(longurl);
          done();
        }));
  });
  it('the url is not in redis store but in db', (done) => {
    const longurl = 'http://longurl.com';
    const shorturl = md5(longurl).substring(0, 6);
    models.shorturls.upsert({
      longurl, shorturl,
    })
      .then(() => redisFlushAll())
      .then(() => supertest(server.listener)
        .get('/read')
        .query({ shorturl })
        .expect(200)
        .then((res) => {
          expect(res.body.longurl).toBe(longurl);
          done();
        }));
  });
});

describe('The read route should take short url and return empty string when', () => {
  it('the shorturl is not in either database', (done) => {
    const longurl = 'http://doesnotexist.com';
    const shorturl = md5(longurl).substring(0, 6);

    models.shorturls.destroy({
      where: {
        shorturl,
      },
    })
      .then(() =>
        supertest(server.listener)
          .get('/read')
          .query({ shorturl })
          .expect(200)
          .then((res) => {
            expect(res.body.longurl).toBe('');
            done();
          }));
  });
});
