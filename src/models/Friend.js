const { FRIEND_PENDING, FRIEND_ACCEPTER } = require("../config/constant")

module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize(
    "Friend",
    {
      status: {
        type: DataTypes.ENUM(FRIEND_PENDING, FRIEND_ACCEPTER),
        allowNull: false,
        defaultValue: FRIEND_PENDING
    }
    },
    {
      underscored: true,
    },
  );

  Friend.associate = (db) => {
    Friend.belongsTo(db.User, {
      as: "Requester",
      foreignKey: {
        name: "requesterId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Friend.belongsTo(db.User, {
      as: "Accepter",
      foreignKey: {
        name: "accepterId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Friend;
};
