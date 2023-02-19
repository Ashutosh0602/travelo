const multer = require("multer");
const sharp = require("sharp");
const packM = require("../modals/package");

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

  req.file.filename = `user-${req.body.userId}-${Date.now()}.jpeg`;
  req.body.bannerPhoto = req.file.filename;

  await sharp(req.file.buffer)
    .resize(1000, 500)
    .withMetadata()
    .toFormat("jpeg")
    .jpeg({ quality: 70 })
    .toFile(`./public/img/template/${req.file.filename}`);

  next();
};

exports.package = async (req, res) => {
  console.log(req.query);
  if (!req.file.filename) {
    return res.status(401).json({
      status: "failed",
      message: "File error",
    });
  }
  try {
    const upload = await packM.create({
      ...req.body,
      bannerPhoto: req.file.filename,
    });

    res.status(201).json({ status: "success", data: upload });
  } catch (error) {
    res
      .status(401)
      .json({ status: "failed", message: "Something went wrong", err: error });
  }
};
