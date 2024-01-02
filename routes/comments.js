const express = require("express");
const router = express.Router();
const config = require("../config");
const Comment = require("../models/Comments");
// 1
router.post("/addComment", async (req, res) => {
  const comment = await Comment.create({
    comment: req.body.comment,
    videoId: req.body.videoId,
    userId: req.body.userId,
    userName: req.body.userName,
    parentCommentId: req.body.parentCommentId,
  });
  res.send(comment);
});
// 2
router.get("/getComments/:id", async (req, res) => {
  let videoComments = await Comment.find({ videoId: { $in: req.params.id } });
  res.send(videoComments);
});
module.exports = router;
