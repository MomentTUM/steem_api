module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    "Game",
    {
      steamAppid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: false,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      aboutTheGame: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      shortDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      detailedDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      headerImage: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      isFree: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notEmpty: false,
        },
      },
      recommendations: {
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      priceOverview: {
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      pcRequirements: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      MacRequirements: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      linuxRequirements: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      publishers: {
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      developers: {
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      platforms: {
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      categories: {
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      genres: {
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      screenshots: {
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      movies: {
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      background: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      requiredAge: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reviews: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      releaseDate: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      legal_notice: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      metacritic: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    { underscored: true, paranoid: true },
  );

  Game.associate = (db) => {
    Game.hasMany(db.Like, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
    Game.hasMany(db.WishList, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
    Game.hasMany(db.Transaction, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
    Game.hasMany(db.Library, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });

    Game.hasMany(db.Review, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
    Game.hasMany(db.Cart, {
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

    Game.hasMany(db.Type, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
    Game.hasMany(db.Sale, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
  };

  return Game;
};
