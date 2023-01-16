const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

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

exports.uploadBanner = upload.single("bannerPhoto");

exports.resizeUserBanner = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.body.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(1000, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 70 })
    .toFile(`./public/img/template/${req.file.filename}`);

  next();
};

exports.package = async (req, res) => {
  res.status(201).json({ status: "success", data: req.body });
};
