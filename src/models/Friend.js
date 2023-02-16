module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize("Friend", {
        status: DataTypes.STRING
    }, {
        underscored: true
    })
    return Friend
}