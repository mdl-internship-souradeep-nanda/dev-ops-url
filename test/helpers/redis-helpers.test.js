const {
  getFromRedis,
  storeIntoRedis,
  redisFlushdb,
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
  it('if key does not exist then it should return null', (done) => {
    getFromRedis('I_HOPE_THIS_KEY_DOES_NOT_EXIST')
      .then((val) => {
        expect(val).toBe(null);
        done();
      });
  });
  it('flushall should flush all records', (done) => {
    const key = 'key';
    const value = 'value';
    storeIntoRedis(key, value)
      .then(() => redisFlushdb())
      .then(() => getFromRedis(key))
      .then((returnedValue) => {
        expect(returnedValue).toBe(null);
        done();
      });
  });
});
