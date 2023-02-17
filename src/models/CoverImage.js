module.exports = (sequelize, DataTypes) => {
  const CoverImage = sequelize.define(
    "CoverImage",
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
    },
  );
  CoverImage.associate = (db) => {
    CoverImage.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return CoverImage;
};
