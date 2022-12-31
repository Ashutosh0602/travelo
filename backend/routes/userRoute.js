const express = require("express");
const usercontrol = require("../controller/userControl");
const authcontrol = require("../controller/authControl");

const router = express.Router();
router.param("/", (req, res, next) => {
  next();
});

router.route("/").get(usercontrol.findUser);

router.route("/signUp").post(usercontrol.createUser);
router.route("/login").post(authcontrol.logIn);
router
  .route("/completeProfile")
  .post(
    usercontrol.uploadPhoto,
    usercontrol.resizeUserPhoto,
    usercontrol.createPhoto
  );

module.exports = router;