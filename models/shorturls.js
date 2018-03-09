module.exports = (sequelize, DataTypes) => {
  const shorturls = sequelize.define('shorturls', {
    longurl: DataTypes.STRING,
    shorturl: DataTypes.STRING,
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      },
    },
  });
  return shorturls;
};
