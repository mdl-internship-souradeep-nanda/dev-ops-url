const supertest = require('supertest');
const md5 = require('md5');

const server = require('../../src/index');
const models = require('../../models');

describe('The write route should take an url and', () => {
  // it('return its md5 hash', (done) => {
  //   const longurl = 'http://longurl.com';
  //   const expectedHash = md5(longurl).substring(0, 6);
  //   supertest(server.listener)
  //     .get('/write')
  //     .query({ longurl })
  //     .expect(200)
  //     .then((res) => {
  //       const { shorturl } = res.body;
  //       expect(shorturl).toBe(expectedHash);
  //       done();
  //     });
  // });
  // it('store its md5 hash in db', (done) => {
  //   const longurl = 'http://longurl.com';
  //   const expectedHash = md5(longurl).substring(0, 6);
  //   models.shorturls.destroy({ truncate: true })
  //     .then(() => supertest(server.listener)
  //       .get('/write')
  //       .query({ longurl })
  //       .expect(200)
  //       .then(() => { }))
  //     .then(() => models.shorturls.findOne({
  //       where: {
  //         longurl,
  //       },
  //     }).then((result) => {
  //       expect(result).toBeTruthy();
  //       expect(result.shorturl).toBe(expectedHash);
  //       done();
  //     }));
  // });
  it('handle hash collision if longurl does not match', (done) => {
    const longurl1 = 'http://givemepotatoes.com/7392';
    const longurl2 = 'http://givemepotatoes.com/930';
    // const expectedHash = md5(longurl1);
    // console.log(expectedHash);
    // Sanity check
    expect(md5(longurl1).substring(0, 6)).toBe(md5(longurl2).substring(0, 6));

    models.shorturls.destroy({ truncate: true })
      .then(() => supertest(server.listener)
        .get('/write')
        .query({ longurl: longurl1 })
        .expect(200)
        .then((res) => {
          const { shorturl } = res.body;
          expect(shorturl).toBe(md5(longurl1).substring(0, 6));
        }))
      .then(() => supertest(server.listener)
        .get('/write')
        .query({ longurl: longurl2 })
        .expect(200)
        .then((res) => {
          const { shorturl } = res.body;
          expect(shorturl).toBe(md5(longurl2).substring(6, 12));
          done();
        }));
  });
});
