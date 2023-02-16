module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define("Profile", {
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        cover: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        }
    }, {
        underscored: true
    })
    return Profile
}