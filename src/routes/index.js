const write = require('./write');
const read = require('./read');

module.exports = [].concat(
  write,
  read,
);
