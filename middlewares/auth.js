const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const Wallet = require("../models/walletModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const verifyJwt = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!payload) return next(new AppError("You are not logged in", 401));

  const user = await User.findOne({
    where: {
      uuid: payload.uuid,
    },
    include: Wallet,
  });
  if (!user) return next(new AppError("You are not logged in", 401));

  req.user = user.toJSON();
  next();
});

module.exports = verifyJwt;
