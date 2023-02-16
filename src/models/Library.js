module.exports = (sequelize, DataTypes) => {
    const Library = sequelize.define("Library", {}, {
        underscored: true
    })

    Library.associate = db => {
        Library.belongsTo(db.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        })
    }

    return Library
}