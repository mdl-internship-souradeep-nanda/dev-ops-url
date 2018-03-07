const {
  getFromRedis,
  storeIntoRedis,
} = require('../../src/helpers/redis-helpers');

describe('The redis helper should be able to', () => {
  it('store a key value pair in redis', (done) => {
    const key = 'key';
    const value = 'value';
    storeIntoRedis(key, value)
      .then(() => getFromRedis(key))
      .then((returnedValue) => {
        expect(returnedValue).toBe(value);
        done();
      });
  });
});

