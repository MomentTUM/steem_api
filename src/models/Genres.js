module.exports = (sequelize, DataTypes) => {
  const Genres = sequelize.define(
    "Genres",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
    },
    {
      underscored: true,
      paranoid: true,
    },
  );

  Genres.associate = (db) => {
    Genres.hasMany(db.Type, {
      foreignKey: {
        name: "genresId",
        allowNull: false,
      },
    });
  };

  // Genres.associate = (db) => {
  //   Genres.hasMany(db.Type, {
  //     foreignKey: {
  //       name: "genresId",
  //       allowNUll: false,
  //     },
  //   });
  // };

  return Genres;
};
