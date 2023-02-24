module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {},
    {
      underscored: true,
      paranoid: true,
    },
  );

  Transaction.associate = (db) => {
    Transaction.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
    Transaction.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    Transaction.belongsTo(db.Payment, {
      foreignKey: {
        name: "paymentId",
        allowNull: false,
      },
    });
  };

  // Transaction.associate = (db) => {
  //   Transaction.belongsTo(db.User, {
  //     foreignKey: {
  //       name: "userId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });

  //   Transaction.belongsTo(db.Game, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });

  //   Transaction.belongsTo(db.Payment, {
  //     foreignKey: {
  //       name: "paymentId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });
  // };
  return Transaction;
};
