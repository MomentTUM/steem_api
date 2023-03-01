module.exports = (sequelize, DataTypes) => {
  LinuxRequirement = sequelize.define(
    "LinuxRequirement",
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
  LinuxRequirement.associate = (db) => {
    LinuxRequirement.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: true,
      },
    });
  };
  return LinuxRequirement;
};
