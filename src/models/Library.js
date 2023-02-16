module.exports = (sequelize, DataTypes) => {
    const Library = sequelize.define("Library", {}, {
        underscored: true
    })
    return Library
}