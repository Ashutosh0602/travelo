const mongoose = require("mongoose");

const packageModal = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  service: {
    type: String,
  },
  serviced: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  language: {
    type: String,
  },
  Visited: {
    type: Number,
  },
  trvellers: {
    type: Number,
  },
  Template: {
    type: String,
    // require:[true,'Provide a template for the package']
  },
});

const packM = mongoose.model("packageView", packageModal);

module.exports = packM;
