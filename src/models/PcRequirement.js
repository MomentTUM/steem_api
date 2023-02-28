module.exports = (sequelize, DataTypes) => {
  PcRequirement = sequelize.define(
    "PcRequirement",
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
  PcRequirement.associate = (db) => {
    PcRequirement.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
  };
  return PcRequirement;
};
