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
    },
    {
      underscored: true,
      paranoid: true,
    },
  );

  Screenshot.associate = (db) => {
    Screenshot.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
  };

  // Screenshot.associate = (db) => {
  //   Screenshot.belongsTo(db.Game, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });
  // };

  return Screenshot;
};
