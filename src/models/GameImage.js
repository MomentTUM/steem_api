module.exports = (sequelize, DataTypes) => {
  const GameImage = sequelize.define(
    "GameImage",
    {
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
    },
    {
      underscored: true,
      paranoid: true
    },
  );

  GameImage.associate = (db) => {
    GameImage.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return GameImage;
};
