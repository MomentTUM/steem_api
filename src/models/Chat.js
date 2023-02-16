module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define("Chat", {
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        messageImage: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        }
    }, {
        underscored: true
    })
    //chat//
    Chat.associate = db => {
        Chat.belongsTo(db.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
    }
    //chat//
    return Chat
}