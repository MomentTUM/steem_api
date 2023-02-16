module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define("Sale", {
        discount: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        calendar: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        }
    }, {
        underscored: true
    })
    return Sale
}