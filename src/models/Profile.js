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
      paranoid: true
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
    Profile.hasMany(db.WishList, {
      foreignKey: {
        name: "profileId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    }),
    Profile.hasMany(db.WishList, {
      foreignKey: {
        name: "profileId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    })
    Profile.hasMany(db.Cart, {
      foreignKey: {
        name: "profileId",
        allowNull: false
      }
    })
  };
  return Profile;
};
