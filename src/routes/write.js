const md5 = require('md5');

const models = require('../../models');

module.exports = [
  {
    path: '/write',
    method: 'GET',
    handler: (request, response) => {
      const { longurl } = request.query;
      const shorturl = md5(longurl).substring(0, 6);
      models.shorturls.upsert({
        longurl,
        shorturl,
      }).then(() => {
        response({ shorturl });
      });
    },
  },
];
