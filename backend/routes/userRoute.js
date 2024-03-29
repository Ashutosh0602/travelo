const express = require("express");
const usercontrol = require("../controller/userControl");
const authcontrol = require("../controller/authControl");
const viewControl = require("../controller//viewControl");
const travellercontrol = require("../controller/travellerControl");
const packageControl = require("../controller/packageControl");

const router = express.Router();
router.param("/", (req, res, next) => {
  next();
});

router
  .route("/account/:userId/home")
  .get(authcontrol.protect, usercontrol.homePage);

router.route("/account/:userId").get(authcontrol.protect, usercontrol.findUser);

router
  .route("/account/:userId/:travellerId")
  .get(authcontrol.protect, travellercontrol.traveller);

router.route("/login").post(authcontrol.logIn);
router.route("/signUp").post(authcontrol.createUser);

router
  .route("/account/:userId/package")
  .post(
    authcontrol.protect,
    packageControl.uploadBanner,
    packageControl.resizeUserBanner,
    packageControl.package
  );

router
  .route("/completeProfile")
  .post(
    authcontrol.protect,
    usercontrol.uploadPhoto,
    usercontrol.resizeUserPhoto,
    usercontrol.createPhoto
  );

router
  .route("/uploadGallery")
  .post(
    authcontrol.protect,
    viewControl.galleryPhoto,
    viewControl.resizeGallery,
    viewControl.uploadGallery
  );

// .post(viewControl.galleryPhoto, viewControl.resizeGallery, viewControl.post);

module.exports = router;
