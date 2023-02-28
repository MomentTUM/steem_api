module.exports = (sequelize, DataTypes) => {
  MacRequirement = sequelize.define(
    "MacRequirement",
    {
      minimum: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      recommendations: {
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
  MacRequirement.associate = (db) => {
    MacRequirement.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
  };
  return MacRequirement;
};
