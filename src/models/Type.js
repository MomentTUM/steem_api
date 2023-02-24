module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define(
    "Type",
    {},
    {
      underscored: true,
      paranoid: true,
    },
  );

  Type.associate = (db) => {
    Type.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
    Type.belongsTo(db.Category, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
    });
    Type.belongsTo(db.Genres, {
      foreignKey: {
        name: "genresId",
        allowNull: false,
      },
    });
  };

  // Type.associate = (db) => {
  //   Type.belongsTo(db.Game, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //   });
  //   Type.belongsTo(db.Category, {
  //     foreignKey: {
  //       name: "categoryId",
  //       allowNull: false,
  //     },
  //   });
  //   Type.belongsTo(db.Genres, {
  //     foreignKey: {
  //       name: "genresId",
  //       allowNull: false,
  //     },
  //   });
  // };
  return Type;
};
