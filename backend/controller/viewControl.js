const multer = require("multer");
const sharp = require("sharp");
const express = require("express");
const viewM = require("../modals/userPhoto");

// To add multiple files

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

exports.galleryPhoto = upload.fields([{ name: "newPhoto", maxCount: 2 }]);

exports.resizeGallery = async (req, res, next) => {
  try {
    if (!req.files.newPhoto[0]) return next();

    req.body.newPhoto = [];

    await Promise.all(
      req.files.newPhoto.map(async (file, i) => {
        const filename = `userGallery-${req.body.name}-${Date.now()}.jpeg`;

        await sharp(file.buffer)
          .resize(800, 1000)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`./public/img/gallery/${filename}`);

        req.body.newPhoto.push(filename);
      })
    );

    next();
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "Either incomplete or inapproriate data is send",
    });
  }
};

exports.uploadGallery = async (req, res) => {
  console.log(req.body);
  if (req.body == null) {
    return res
      .status(401)
      .json({ status: "failed", message: "empty data is send" });
  }
  let uploadPhoto;
  try {
    const existUser = await viewM.findOne({ userID: req.body.name });
    // console.log(req.body.newPhoto.length, existUser);

    // If user found in database then update the profile
    if (existUser) {
      // for (let i = 0; i < req.body.newPhoto.length; i++) {
      uploadPhoto = await viewM.findOneAndUpdate(
        { userID: req.body.name },
        {
          $push: { gallery: { photoID: req.body.newPhoto } },
        }
      );
      // }
    } else {
      // Otherwise create new database for the existing user
      for (let i = 0; i < req.body.newPhoto.length; i++) {
        uploadPhoto = await viewM.create({
          userID: req.body.name,
          gallery: {
            photoID: req.body.newPhoto,
          },
        });
      }
    }
  } catch (error) {
    return res
      .status(401)
      .json({ status: "failed", message: "Something went wrong" });
  }

  // const newUser = new viewM(req.body);
  // newUser.save().then((doc) => {
  //   console.log(doc);

  // });
  //   console.log(req.body);
  res.status(200).json({
    status: "success",
    data: uploadPhoto,
  });
};
