const express = require("express");
const router = express.Router();
const config = require("../config");
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchuser");
//1

router.post("/addNote", async (req, res) => {
  const note = await Notes.create({
    note: req.body.note,
    videoId: req.body.videoId,
    userId: req.body.userId,
  });
  res.send(note);
});
//2
router.get("/getNotes/:id/:userId", async (req, res) => {
  let videoNotes = await Notes.find({
    videoId: { $in: req.params.id },
    userId: { $in: req.params.userId },
  });
  res.send(videoNotes);
});

//3

router.put("/updateNote/:id", fetchUser, async (req, res) => {
  let updatedNote = await Notes.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        note: req.body.note,
      },
    },
    { new: true }
  );

  res.send(updatedNote);
});
module.exports = router;
