module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        }
    }, {underscored: true})
    return Review
}