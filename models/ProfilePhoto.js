//This is used to craete Schema

const mongoose = require("mongoose");
const { Schema } = mongoose;

const profilePhotoSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  addedOn: {
    type: Date,
    default: Date.now,
  },
  picture: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("profilePhoto", profilePhotoSchema);
