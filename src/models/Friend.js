module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define("Friend", {
        status: DataTypes.STRING
    }, {
        underscored: true
    })
    return Friend
}