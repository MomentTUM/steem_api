module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true,
      paranoid: true },
  );

  Review.associate = (db) => {
    Review.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Review.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Review;
};
