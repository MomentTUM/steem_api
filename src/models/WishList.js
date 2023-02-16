module.exports = (sequelize, DataTypes) => {
    const WishList = sequelize.define("WishList", {}, {
        underscored: true
    })

    WishList.associate = db => {
        Friend.belongsTo(db.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
    }

    return WishList
}