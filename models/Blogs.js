//This is used to craete Schema

const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  blogTitle: {
    type: String,
    required: true,
  },
  blog: {
    type: String,
    required: true,
  },

  blogCategory: {
    type: String,
    required: true,
  },

  addedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("blog", blogSchema);
