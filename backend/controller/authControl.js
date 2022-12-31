const jwt = require("jsonwebtoken");
const userM = require("../modals/user");
const AppError = require("../utils/apiError");

exports.logIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      status: "failed",
      message: "Please provide email and password",
    });

    // next(new AppError("Please provide email and password", 404));
  }

  const user = await userM.findOne({ email: email });

  const correct = user.correctPassword(password, user.password);
  if (!user || !correct) {
    return res.status(401).json({
      status: "failed",
      message: "Incorrect email or password",
    });
  }
  const token = "";
  res.status(200).json({
    status: "success",
    token,
    user,
  });
};
