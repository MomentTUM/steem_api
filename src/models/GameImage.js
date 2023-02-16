module.exports = (sequelize, DataTypes) => {
    const GameImage = sequelize.define("GameImage", {
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        }
    }, {
        underscored: true
    })
    return GameImage
}