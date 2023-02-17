module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
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
    },
  );
  Profile.associate = (db) => {
    Profile.hasMany(db.UserImage, {
      foreignKey: {
        name: "profileId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    }),
      Profile.hasMany(db.CoverImage,{
        foreignKey: {
            name: "profileId",
            allowNull: false
        },
        onDelete: "RESTRICT"
      });
  };
  return Profile;
};
