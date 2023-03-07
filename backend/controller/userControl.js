const multer = require("multer");
const sharp = require("sharp");
const userM = require("../modals/user");
const viewM = require("../modals/userPhoto");
const AppError = require("../utils/apiError");

const multerStorage = multer.memoryStorage(); // Shifting to memory Storage
// because resizing is done from buffer state

const multerFilter = (req, file, cb) => {
  console.log(file);
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
  console.log(req.file);
  if (!req.file) return next();

  req.file.filename = `user-${req.body.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .withMetadata()
    .toFormat("jpeg")
    .jpeg({ quality: 70 })
    .toFile(`./public/img/users/${req.file.filename}`);

  next();
};

// uploading of photo
exports.createPhoto = async (req, res, next) => {
  if (req.body == null) {
    return next(new AppError("Something is missing", 400));
  }
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
    console.log(req.params);
    // const user = await userM.findOne({ id: req.id });
    res.status(200).json({ status: "success", data: req.user });
  } catch (error) {
    return res.status(401).json({ status: "failed", message: error });
  }
};

exports.homePage = async (req, res) => {
  const home_cont = await viewM.aggregate([
    { $match: { public: true } },
    { $unset: ["_id"] },
  ]);

  // const home_cont = await userM.aggregate([
  //   { $match: { public: true } },
  //   { $unset: ["password", "_id"] },
  // ]);

  return res.status(200).json({
    status: "success",
    message: [home_cont],
  });
};
