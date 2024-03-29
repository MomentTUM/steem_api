module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: false,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: false,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      coverImage: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      role: {
        type: DataTypes.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user",
      },
    },
    { underscored: true, paranoid: true },
  );

  User.associate = (db) => {
    User.hasMany(db.Transaction, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    User.hasMany(db.Friend, {
      as: "Requester",
      foreignKey: {
        name: "requesterId",
        allowNull: false,
      },
    });
    User.hasMany(db.Friend, {
      as: "Accepter",
      foreignKey: {
        name: "accepterId",
        allowNull: false,
      },
    });
    User.hasMany(db.Chat, {
      as: "Sender",
      foreignKey: {
        name: "senderId",
        allowNull: false,
      },
    });
    User.hasMany(db.Chat, {
      as: "Receiver",
      foreignKey: {
        name: "receiverId",
        allowNull: false,
      },
    });
    User.hasMany(db.WishList, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    User.hasMany(db.Library, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    User.hasMany(db.Review, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    User.hasMany(db.Cart, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    User.hasMany(db.Like, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
  };

  // User.associate = (db) => {
  //   User.hasMany(db.Like, {
  //     foreignKey: {
  //       name: "userId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });
  //   User.hasMany(db.Transaction, {
  //     foreignKey: {
  //       name: "userId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });
  //   User.hasMany(db.Review, {
  //     foreignKey: {
  //       name: "userId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });

  //   User.hasMany(db.Friend, {
  //     as: "Requester",
  //     foreignKey: {
  //       name: "requesterId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });

  //   User.hasMany(db.Friend, {
  //     as: "Accepter",
  //     foreignKey: {
  //       name: "accepterId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });

  //   //chat//
  //   User.hasMany(db.Chat, {
  //     as: "Sender",
  //     foreignKey: {
  //       name: "senderId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });
  //   User.hasMany(db.Chat, {
  //     as: "Receiver",
  //     foreignKey: {
  //       name: "receiverId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });
  //   //chat//

  //   User.hasMany(db.Profile, {
  //     foreignKey: {
  //       name: "userId",
  //       allowNull: false
  //     },
  //     onDelete: "RESTRICT"
  //   })
  // };
  return User;
};
