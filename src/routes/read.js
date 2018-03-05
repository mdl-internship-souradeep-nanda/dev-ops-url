const models = require('../../models');

module.exports = [
  {
    path: '/read',
    method: 'GET',
    handler: (request, response) => {
      const { shorturl } = request.query;

      models.shorturls.findOne({
        where: {
          shorturl,
        },
      }).then((obj) => {
        response({ longurl: obj.longurl });
      }).catch(() => {
        response({ longurl: '' });
      });
    },
  },
];
