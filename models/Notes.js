//This is used to craete Schema

const mongoose = require("mongoose");
const { Schema } = mongoose;

const notesSchema = new Schema({
  note: {
    type: String,
    required: true,
  },

  videoId: {
    type: String,
    required: true,
  },

  addedOn: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("notes", notesSchema);
