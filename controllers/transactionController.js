const Transaction = require("../models/transactionModel");
const { User } = require("../models/userModel");
const Wallet = require("../models/walletModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createTransaction = catchAsync(async (req, res, next) => {
  const { amount, type } = req.body;
  const transaction = await Transaction.create({
    amount,
    type,
  });
  const userWallet = req.user.Wallet;
  const user = await User.findAll({
    where: {
      uuid: req.user.uuid,
    },
  });

  transaction.setUser(req.user.uuid);

  if (type === "deposit") {
    await Wallet.update(
      {
        availableBal: userWallet.availableBal + amount,
        totalDeposit: userWallet.totalDeposit + amount,
      },
      {
        where: {
          walletID: req.user.uuid,
        },
      }
    );
  } else if (type === "withdrawal") {
    if (userWallet.availableBal < amount)
      return next(new AppError("Insufficient funds", 400));

    await Wallet.update(
      {
        availableBal: userWallet.availableBal - amount,
        totalWithdrawal: userWallet.totalWithdrawal + amount,
      },
      {
        where: {
          walletID: req.user.uuid,
        },
      }
    );
  }

  res.send(transaction.toJSON());
});

exports.getTransactions = catchAsync(async (req, res) => {
  const transactions = await Transaction.findAll({
    where: {
      userID: req.user.uuid,
    },
  });

  res.send(transactions);
});
