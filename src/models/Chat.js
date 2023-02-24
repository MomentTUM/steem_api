module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    "Chat",
    {
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      messageImage: {
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

  Chat.associate = (db) => {
    Chat.belongsTo(db.User, {
      as: "Sender",
      foreignKey: {
        name: "senderId",
        allowNull: false,
      },
    });
    Chat.belongsTo(db.User, {
      as: "Receiver",
      foreignKey: {
        name: "receiverId",
        allowNull: false,
      },
    });
  };

  //chat//
  // Chat.associate = (db) => {
  //   Chat.belongsTo(db.User, {
  //     as: "Sender",
  //     foreignKey: {
  //       name: "senderId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });
  //   Chat.belongsTo(db.User, {
  //     as: "Receiver",
  //     foreignKey: {
  //       name: "receiverId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });
  // };
  //chat//

  return Chat;
};
