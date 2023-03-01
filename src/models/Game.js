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
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      shortDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      detailedDescription: {
        type: DataTypes.TEXT,
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
      isFree: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notEmpty: false,
        },
      },
      recommendations: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      priceOverview: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
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
    Game.hasMany(db.Screenshot, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
    Game.hasMany(db.Movie, {
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
    // Game.hasMany(db.Price, {
    //   foreignKey: {
    //     name: "gameId",
    //     allowNull: false,
    //   },
    // });
    Game.hasMany(db.Platform, {
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
    Game.hasMany(db.Developer, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
    Game.hasMany(db.Publisher, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
    Game.hasMany(db.MacRequirement, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
    Game.hasMany(db.PcRequirement, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
    Game.hasMany(db.LinuxRequirement, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
  };

  // Game.associate = (db) => {
  //   Game.hasMany(db.Transaction, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });

  //   Game.hasMany(db.Library, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });

  //   Game.hasMany(db.Screenshot, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });

  //   Game.hasMany(db.Like, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });

  //   Game.hasMany(db.Review, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });

  //   Game.hasMany(db.Sale, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });

  //   Game.hasMany(db.WishList, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });
  //   Game.hasMany(db.Cart, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //   });
  //   Game.hasMany(db.Price, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //   });
  //   Game.hasMany(db.Platform, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //   });
  //   Game.hasMany(db.Requirement, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //   });
  //   Game.hasMany(db.Movie, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //   });
  //   Game.hasMany(db.Type, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //   });
  // };
  return Game;
};
