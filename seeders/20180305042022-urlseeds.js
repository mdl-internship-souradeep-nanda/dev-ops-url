const md5 = require('md5');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const urls = [];
    const map = {};

    const totalEntries = 1e+6;
    const shortUrlLength = 6;

    for (let i = 0; i < totalEntries; i += 1) {
      const longurl = `http://givemepotatoes.com/${i}`;
      const hash = md5(longurl);

      // if there is a hash collision then get the next 6
      // characters of the hash
      let j = 0;
      while (map[hash.substring(j, j + shortUrlLength)] !== undefined) {
        j += shortUrlLength;
        if (j + shortUrlLength > hash.length) {
          console.log('FUCK');
          break;
        }
      }

      // Mark the hash as taken in the hashmap
      map[hash.substring(j, j + shortUrlLength)] = true;
      const shorturl = hash.substring(j, j + shortUrlLength);

      urls.push({
        longurl, shorturl, createdAt: new Date(), updatedAt: new Date(),
      });

      if (i % 1e+4 === 0) {
        console.log(i);
      }
    }

    console.log('Bulk inserting');
    return queryInterface.bulkInsert('shorturls', urls, {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('shorturls', null, {}),
};
