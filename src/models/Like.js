module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      review: {
        type: DataTypes.ENUM("like", "dislike", "unlike"),
        allowNull: false,
        defaultValue: "unlike",
      },
    },
    {
      underscored: true,
      paranoid: true,
    },
  );

  Like.associate = (db) => {
    Like.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    Like.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
  };

  // Like.associate = (db) => {
  //   Like.belongsTo(db.User, {
  //     foreignKey: {
  //       name: "userId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });

  //   Like.belongsTo(db.Game, {
  //     foreignKey: {
  //       name: "gameId",
  //       allowNull: false,
  //     },
  //     onDelete: "RESTRICT",
  //   });
  // };
  return Like;
};
