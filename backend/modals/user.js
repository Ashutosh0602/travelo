const mongoose = require("mongoose");
const validator = require("validator");

const userModal = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A username is mandatory"],
  },
  id: {
    type: String,
    required: [true, "A id is mandatory"],
    unique: [true, "A unique email is required"],
  },
  email: {
    type: String,
    required: [true, "A email is required"],
    unique: [true, "A unique email is required"],
    lowercase: true,
    validator: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlenght: 8,
  },
  passwordConfirm: {
    type: String,
    required: true,
  },
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
});

const userM = mongoose.model("TravelUser", userModal);

module.exports = userM;
