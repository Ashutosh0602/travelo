const express = require("express");
const usercontrol = require("../controller/userControl");
const authcontrol = require("../controller/authControl");
const viewControl = require("../controller//viewControl");

const router = express.Router();
router.param("/", (req, res, next) => {
  next();
});

router.route("/").get(authcontrol.protect, usercontrol.findUser);

router.route("/signUp").post(authcontrol.createUser);
router.route("/login").post(authcontrol.logIn);
router
  .route("/completeProfile")
  .post(
    usercontrol.uploadPhoto,
    usercontrol.resizeUserPhoto,
    usercontrol.createPhoto
  );

router
  .route("/uploadGallery")
  .post(
    viewControl.galleryPhoto,
    viewControl.resizeGallery,
    viewControl.uploadGallery
  );

// .post(viewControl.galleryPhoto, viewControl.resizeGallery, viewControl.post);

module.exports = router;
