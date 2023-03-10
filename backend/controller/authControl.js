const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const userM = require("../modals/user");
const AppError = require("../utils/apiError");
const { rmSync } = require("fs");

// Create / sing up new user

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_secret, {
    expiresIn: process.env.JWT_expires,
  });
};

exports.createUser = async (req, res) => {
  try {
    let jn = req.body.obj.name.split(" ");
    let fn = jn.join("_");

    const uID = `@${fn}345`;
    console.log({ ...req.body.obj, id: uID });
    const newUser = await userM.create({ ...req.body.obj, id: uID });

    const token = signToken(newUser._id);

    res.status(200).json({
      status: "success",
      token,
      data: newUser,
    });
    // const newUser = new userM(req.body);
    // newUser.save().then((doc) => {
    //   console.log(doc);
    // });
  } catch (error) {
    res.status(400).json({ status: "Server error", message: error });
  }
};

exports.logIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      status: "failed",
      message: "Please provide email and password",
    });

    // next(new AppError("Please provide email and password", 404));
  }

  const user = await userM.findOne({ email: email }).select("+password");
  // const user = await userM.findOne({ email: email });

  //   const correct = await user.correctPassword(password, user.password);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "failed",
      message: "Incorrect email or password",
    });
  }
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
    user: user["id"],
  });
};

// Protect the routes

exports.protect = async (req, res, next) => {
  //Get token to check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ status: "Failed", message: "No token found" });
  }

  // Validation of token

  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_secret);
    console.log(decoded);
  } catch (error) {
    return res
      .status(401)
      .json({ status: "Failed", message: "Irregular token found" });
  }

  // Check if the user still exist

  const freshUser = await userM.findById(decoded.id);
  if (!freshUser) {
    return res.status(401).json({ status: "failed", message: "Invalid User" });
  }

  // Check if the user changes password after the issue of jwt

  if (freshUser.changedPasswordAfter(decoded.id)) {
    return res
      .status(401)
      .json({ status: "failed", message: "User recently changed Passowrd" });
  }
  req.user = freshUser;
  next();
};
