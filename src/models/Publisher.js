module.exports = (sequelize, DataTypes) => {
  const Publisher = sequelize.define(
    "Publisher",
    {},
    {
      underscored: true,
      paranoid: true,
    },
  );

  Publisher.associate = (db) => {
    Publisher.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
  };

  return Publisher;
};
