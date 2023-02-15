const mongoose = require("mongoose");
const UserM = require("./user");

const viewModal = new mongoose.Schema({
  userID: { type: String, required: true },
  public: { type: Boolean },
  gallery: [
    {
      photoID: [{ type: String }],
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

viewModal.pre("save", async function (next) {
  const id = await UserM.find({ id: this.userID });
  this.public = id[0]["public"];
  // this.gallery.public = id.public;
  console.log(id[0]["public"]);
  next();
});

const viewM = mongoose.model("TravelView", viewModal);

module.exports = viewM;
