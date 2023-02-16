module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("Transaction", {}, {
        underscored: true
    })
    return Transaction
}