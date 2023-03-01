module.exports = (sequelize, DataTypes) => {
  MacRequirement = sequelize.define(
    "MacRequirement",
    {
      minimum: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      recommended: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          notEmpty: true,
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
  MacRequirement.associate = (db) => {
    MacRequirement.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: true,
      },
    });
  };
  return MacRequirement;
};
