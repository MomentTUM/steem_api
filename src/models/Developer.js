module.exports = (sequelize, DataTypes) => {
  const Developer = sequelize.define(
    "Developer",
    {
      steamAppid: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      name: {
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
  return Developer;
};
