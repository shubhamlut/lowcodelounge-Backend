//This is used to craete Schema

const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentsSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },

  videoId: {
    type: String,
    required: true,
  },
  parentCommentId: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },

  addedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("comment", commentsSchema);
