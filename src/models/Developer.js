module.exports = (sequelize, DataTypes) => {
  const Developer = sequelize.define(
    "Developer",
    {},
    {
      underscored: true,
      paranoid: true,
    },
  );

  Developer.associate = (db) => {
    Developer.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
  };

  return Developer;
};
