const { FRIEND_PENDING, FRIEND_ACCEPTER } = require("../config/constant")

module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define("Friend", {
        status: {
            type: DataTypes.ENUM(FRIEND_PENDING, FRIEND_ACCEPTER),
            allowNull: false,
            defaultValue: FRIEND_PENDING
        }
    }, {
        underscored: true
    })
    return Friend
}