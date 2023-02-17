module.exports = (sequelize, DataTypes) => {
  const UserImage = sequelize.define(
    "UserImage",
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
  UserImage.associate = (db) => {
    UserImage.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return UserImage;
};
