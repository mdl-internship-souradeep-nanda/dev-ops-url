const redis = require('redis');

const client = redis.createClient();
const { promisify } = require('util');

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const getFromRedis = key => getAsync(key);
const storeIntoRedis = (key, value) => setAsync(key, value);

module.exports = {
  getFromRedis,
  storeIntoRedis,
};
