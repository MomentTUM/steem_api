module.exports = (sequelize, DataTypes) => {
  const WishList = sequelize.define(
    "WishList",
    {},
    {
      underscored: true,
      paranoid: true
    },
  );

  WishList.associate = (db) => {
    WishList.belongsTo(db.Profile, {
      foreignKey: {
        name: "profileId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    WishList.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return WishList;
};
