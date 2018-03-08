const redis = require('redis');

const client = redis.createClient();
const { promisify } = require('util');

const FIELD = 'LONG_URL';

const getFromRedis = key =>
  promisify(client.hget).bind(client)(key, FIELD);

const storeIntoRedis = (key, value) =>
  promisify(client.hset).bind(client)(key, FIELD, value);

const redisFlushAll = promisify(client.flushall).bind(client);

module.exports = {
  getFromRedis,
  storeIntoRedis,
  redisFlushAll,
};
