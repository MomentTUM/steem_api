module.exports = (sequelize, DataTypes) => {
  PcRequirement = sequelize.define(
    "PcRequirement",
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
  PcRequirement.associate = (db) => {
    PcRequirement.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: true,
      },
    });
  };
  return PcRequirement;
};
