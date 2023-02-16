module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize("Friend", {
        status: DataTypes.STRING
    }, {
        underscored: true
    })

    Friend.associate = db => {
        Friend.belongsTo(db.User, {
            as: 'Requester',
            foreignKey: {
                name: 'requesterId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })

        Friend.belongsTo(db.User, {
            as: 'Accepter',
            foreignKey: {
                name: 'accepterId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
    }

    return Friend
}

