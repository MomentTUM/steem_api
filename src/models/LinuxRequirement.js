module.exports = (sequelize, DataTypes) => {
  LinuxRequirement = sequelize.define(
    "LinuxRequirement",
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
  LinuxRequirement.associate = (db) => {
    LinuxRequirement.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
  };
  return LinuxRequirement;
};
