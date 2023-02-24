module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
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

  Category.associate = (db) => {
    Category.hasMany(db.Type, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
    });
  };

  // Category.associate = (db) => {
  //   Category.hasMany(db.Type, {
  //     foreignKey: {
  //       name: "categoryId",
  //       allowNull: false,
  //     },
  //   });
  // };

  return Category;
};
