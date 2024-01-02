//This is used to craete Schema

const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
  },

  duration: {
    type: String,
    required: true,
  },
  addedOn: {
    type: Date,
    default: Date.now,
  },
  videoId: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  index:{
    type: Number,
    required:true
  }
});

module.exports = mongoose.model("video", videoSchema);
