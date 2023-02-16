module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define("Payment", {}, {
        underscored: true
    })
    return Payment
}