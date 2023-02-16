module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("Like", {
        like: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        dislike: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        underscored: true
    })
    return Like
}