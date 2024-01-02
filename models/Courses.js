//This is used to craete Schema

const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },
  addedOn: {
    type: Date,
    default: Date.now,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("course", courseSchema);
