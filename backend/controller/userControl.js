const multer = require("multer");
const express = require("express");
const jwt = require("jsonwebtoken");
const sharp = require("sharp");
const userM = require("../modals/user");
const AppError = require("../utils/apiError");

// Storing and uploading photos

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/img");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.body.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage(); // Shifting to memory Storage
// because resizing is done from buffer state

const multerFilter = (req, file, cb) => {
  try {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("Select only single Image file...", 400), false);
    }
  } catch (error) {
    new AppError("Select only single Image file...", 400);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
// const upload = multer({
//   dest: "../public/img/",
// });
exports.uploadPhoto = upload.single("profilePhoto");

// Resizing of uploading photo
exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.body.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`./public/img/users/${req.file.filename}`);

  next();
};

// Create / sing up new user
exports.createUser = async (req, res) => {
  try {
    const newUser = await userM.create(req.body);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_secret, {
      expiresIn: process.env.JWT_expires,
    });

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

// uploading of photo
exports.createPhoto = async (req, res, next) => {
  if (req.body == null) {
    return next(new AppError("Something is missing", 400));
  }
  // console.log(req.file, req.body);
  try {
    const profilePhoto = { profilePhoto: req.file.filename };
    const update = await userM.findOneAndUpdate(req.body, profilePhoto, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ stats: "success", data: update });
  } catch (error) {
    res.status(404).json({ status: "failed", message: error });
  }
};

// Get user for home page
exports.findUser = async (req, res) => {
  try {
    const user = await userM.find();
    res.status(200).json({ status: "success", data: user });
  } catch (error) {}
};
