const md5 = require('md5');

module.exports = [
  {
    path: '/write',
    method: 'GET',
    handler: (request, response) => {
      const { longurl } = request.query;
      const shorturl = md5(longurl).substring(0, 6);
      response({ shorturl });
    },
  },
];
