module.exports = (sequelize, DataTypes) => {
  const Screenshot = sequelize.define(
    "Screenshot",
    {
      pathThumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      steamAppid: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      underscored: true,
      paranoid: true,
    },
  );

  return Screenshot;
};
