const catchAsync = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      console.log("This is the error", err.name);
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({
          status: "fail",
          message: "This email has already been used",
        });
      }
      next(err);
    }
  };
};

module.exports = catchAsync;
