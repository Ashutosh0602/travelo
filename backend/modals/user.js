const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userModal = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A username is mandatory"],
  },
  id: {
    type: String,
    required: [true, "A id is mandatory"],
    unique: [true, "A user already  existed"],
  },
  email: {
    type: String,
    required: [true, "A email is required"],
    unique: [true, "A unique email is required"],
    lowercase: true,
    validator: [validator.isEmail, "Please provide a valid email"],
    select: false,
  },
  password: {
    type: String,
    required: true,
    minlenght: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not same",
    },
  },
  passwordChangeAt: Date,
  city: {
    type: String,
    required: [true, "A city is mandatory"],
  },
  country: {
    type: String,
    required: [true, "A country is mandatory"],
  },
  visited: {
    type: Number,
    default: 0,
  },
  Travellers: {
    type: Number,
    default: 0,
  },
  public: {
    type: Boolean,
    default: true,
  },
  link: {
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },
  profilePhoto: String,
  coverPhoto: String,
});

userModal.pre("save", async function (next) {
  // Only when the password is modified not every time the queryv is updated
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

// Creating a export package for all the files to verify the password

userModal.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userModal.methods.changedPasswordAfter = function (JWTtimeStamp) {
  if (this.passwordChangeAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    console.log(this.passwordChangeAt, JWTtimeStamp);
    return JWTtimeStamp < changedTimeStamp;
  }
  return false; //False means not changed
};

const userM = mongoose.model("TravelUser", userModal);

module.exports = userM;
