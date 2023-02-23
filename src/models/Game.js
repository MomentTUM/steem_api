module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    "Game",
    {
      appId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      vdo: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      shortDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      headerImage: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      developers: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      publishers: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      pcMinRequirement: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      pcRecRequirement: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      macMinRequirement: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      macRecRequirement: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true, paranoid: true },
  );

  Game.associate = (db) => {
    Game.hasMany(db.Transaction, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Game.hasMany(db.Library, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Game.hasMany(db.GameImage, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Game.hasMany(db.Like, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Game.hasMany(db.Review, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Game.hasMany(db.Sale, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Game.hasMany(db.WishList, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Game.hasMany(db.Cart, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
    Game.hasMany(db.Category, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
    Game.hasMany(db.Price, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
    Game.hasMany(db.Platform, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
  };
  return Game;
};
