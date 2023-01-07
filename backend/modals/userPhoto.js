const mongoose = require("mongoose");

const viewModal = new mongoose.Schema({
  userID: String,
  gallery: [
    {
      photoID: String,
      count: {
        heart: {
          type: Number,
          default: 0,
        },
        Funny: {
          type: Number,
          default: 0,
        },
        Love: {
          type: Number,
          default: 0,
        },
        Happy: {
          type: Number,
          default: 0,
        },
      },
    },
  ],
});

const viewM = mongoose.model("TravelView", viewModal);

module.exports = viewM;
