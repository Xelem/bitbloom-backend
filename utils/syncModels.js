const Transaction = require("../models/transactionModel");
const { User } = require("../models/userModel");
const Wallet = require("../models/walletModel");

module.exports = async () => {
  try {
    await User.sync();
    await Wallet.sync();
    await Transaction.sync();
    console.log("All models synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing user model:", error);
  }
};
