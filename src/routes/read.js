const models = require('../../models');
const {
  getFromRedis,
  storeIntoRedis,
} = require('../../src/helpers/redis-helpers');

module.exports = [
  {
    path: '/read',
    method: 'GET',
    handler: (request, response) => {
      const { shorturl } = request.query;

      // Check if data is in redis store
      getFromRedis(shorturl)
        .then((longurl) => {
          if (longurl === null) {
            // If data does not exist in redis,
            // then check db
            models.shorturls.findOne({
              where: {
                shorturl,
              },
            }).then((obj) => {
              if (obj !== null) {
                // If data is found in db,
                // store it into redis
                storeIntoRedis(shorturl, obj.longurl)
                  .then(() => {
                    response({ longurl: obj.longurl });
                  });
              } else {
                // Data does not exist in DB
                response({ longurl: '' });
              }
            });
          } else {
            // Data exists in redis cache
            response({ longurl });
          }
        });
    },
  },
];
