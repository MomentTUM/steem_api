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
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      coverImage: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      underscored: true,
    },
  );
  Profile.associate = (db) => {
    Profile.belongsTo(db.User, {
        foreignKey: {
            name: "userId",
            allowNull: false
        },
        onDelete: "RESTRICT"
    })
  };
  return Profile;
};
