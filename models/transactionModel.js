const { sequelize } = require("../database/db");
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const Transaction = sequelize.define(
  "Transaction",
  {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("withdrawal", "deposit"),
      allowNull: false,
    },
  },
  {
    tableName: "transactions",
  }
);

module.exports = Transaction;
