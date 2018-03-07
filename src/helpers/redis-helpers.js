const redis = require('redis');

const client = redis.createClient();
const { promisify } = require('util');

const getFromRedis = promisify(client.get).bind(client);
const storeIntoRedis = promisify(client.set).bind(client);
const redisFlushdb = promisify(client.flushdb).bind(client);

module.exports = {
  getFromRedis,
  storeIntoRedis,
  redisFlushdb,
};
