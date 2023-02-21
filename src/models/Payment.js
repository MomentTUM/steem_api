module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {},
    {
      underscored: true,
      paranoid: true
    },
  );

  Payment.associate = (db) => {
    Payment.hasMany(db.Transaction, {
      foreignKey: {
        name: "paymentId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Payment;
};
