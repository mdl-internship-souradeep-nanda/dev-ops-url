const md5 = require('md5');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const urls = [];
    for (let i = 0; i < 1e+6; i += 1) {
      const longurl = `http://givemepotatoes.com/${i}`;
      const shorturl = md5(longurl).substring(0, 6);
      urls.push({
        longurl, shorturl, createdAt: new Date(), updatedAt: new Date(),
      });
    }

    // console.log(urls);

    return queryInterface.bulkInsert('shorturls', urls, {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('shorturls', null, {}),
};
