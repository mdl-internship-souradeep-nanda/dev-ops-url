const write = require('./write');
const read = require('./read');
const ping = require('./ping');

module.exports = [].concat(
  write,
  read,
  ping,
);
