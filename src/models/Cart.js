module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {},
    {
      underscored: true,
      paranoid: true,
    },
  );

  Cart.associate = (db) => {
    Cart.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    Cart.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
  };

  // Cart.associate = (db) => {
  //     Cart.belongsTo(db.Profile, {
  //         foreignKey: {
  //             name: "profileId",
  //             allowNull: false
  //         }
  //     })
  //     Cart.belongsTo(db.Game, {
  //         foreignKey: {
  //             name: "gameId",
  //             allowNull: false
  //         }
  //     })
  // }

  return Cart;
};
