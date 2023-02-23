module.exports = (sequelize, DataTypes) => {
  const Requirement = sequelize.define(
    "Requirement",
    {
      os: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      processor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      memory: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      graphic: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      directX: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      network: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      storage: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      spec: {
        type: DataTypes.ENUM("minimum", "recommend"),
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      platform: {
        type: DataTypes.ENUM("pc", "mac"),
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
    },
    {
      underscored: true,
      paranoid: true,
    },
  );

  Requirement.associate = (db) => {
    Requirement.belongsTo(db.Game, {
      foreignKey: {
        name: "gameId",
        allowNull: false,
      },
    });
  };

  return Requirement;
};
