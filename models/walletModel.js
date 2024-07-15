const { sequelize } = require("../database/db");
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const Wallet = sequelize.define(
  "Wallet",
  {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    availableBal: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalDeposit: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalWithdrawal: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "wallets",
  }
);

module.exports = Wallet;
