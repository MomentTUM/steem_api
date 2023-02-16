module.exports = (sequelize, DataTypes) => {
    const WishList = sequelize.define("WishList", {}, {
        underscored: true
    })
    return WishList
}