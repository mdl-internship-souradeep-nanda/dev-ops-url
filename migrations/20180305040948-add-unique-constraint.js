module.exports = {
  up: (queryInterface) => {
    queryInterface.sequelize
      .query('ALTER TABLE shorturls ADD UNIQUE (longurl, shorturl)');
  },
  down: (queryInterface) => {
    queryInterface.sequelize
      .query('ALTER TABLE shorturls DROP CONSTRAINT shorturls_longurl_shorturl_key');
  },
};
