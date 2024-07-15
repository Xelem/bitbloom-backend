const catchAsync = require("../utils/catchAsync");
const _ = require("lodash");
const { User, validateUser } = require("../models/userModel");
const AppError = require("../utils/appError");

exports.getCurrentUser = catchAsync(async (req, res) => {
  const user = req.user;
  res.send(_.omit(user, "password"));
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { fullName, dateOfBirth, country } = req.body;
  const user = {
    fullName,
    dateOfBirth,
    country,
    emailAddress: req.user.emailAddress,
  };

  await User.update(
    { fullName, dateOfBirth, country },
    {
      where: {
        uuid: req.user.uuid,
      },
    }
  );

  res.send("User upadated");
});
