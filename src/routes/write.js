const md5 = require('md5');

const models = require('../../models');

const createNewRecord = (longurl, hash, index) => {
  const shorturl = hash.substring(index, index + 6);
  // console.log('shorturl', hash, index);
  return models.shorturls.findOne({
    where: {
      shorturl,
    },
  })
    .then((result) => {
      if (result === null) {
        return models.shorturls.upsert({ longurl, shorturl });
      }
      return createNewRecord(longurl, hash, index + 6);
    });
};

module.exports = [
  {
    path: '/write',
    method: 'GET',
    handler: (request, response) => {
      const { longurl } = request.query;
      const hash = md5(longurl);
      // console.log('write', hash);
      models.shorturls.findOne({
        where: {
          longurl,
        },
      }).then((result) => {
        if (result !== null) {
          // If longurl is present in db, just return the shorturl
          response({ shorturl: result.shorturl });
        } else {
          // Create a new entry with unique shorturl
          createNewRecord(longurl, hash, 0)
            .then(() => models.shorturls.findOne({
              where: {
                longurl,
              },
            }))
            .then((secondResult) => {
              response({ shorturl: secondResult.shorturl });
            });
        }
      });
    },
  },
];
