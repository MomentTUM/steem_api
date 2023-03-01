module.exports = (sequelize, DataTypes) => {
  const Platform = sequelize.define(
    "Platform",
    {
      window: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      mac: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      linux: {
        type: DataTypes.BOOLEAN,
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

  Platform.associate = (db) => {
    Platform.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: true,
      },
    });
  };

  // Platform.associate = (db) => {
  //   Platform.belongsTo(db.Game, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //   });
  // };
  return Platform;
};
