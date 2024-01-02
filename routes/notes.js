const express = require("express");
const router = express.Router();
const config = require("../config");
const Notes = require("../models/Notes");

router.post("/addNote", async (req, res) => {
  const note = await Notes.create({
    note: req.body.note,
    videoId: req.body.videoId,
    userId: req.body.userId,
  });
  res.send(note);
});

router.get("/getNotes/:id/:userId", async (req, res) => {
  let videoNotes = await Notes.find({
    videoId: { $in: req.params.id },
    userId: { $in: req.params.userId },
  });
  res.send(videoNotes);
});
module.exports = router;
