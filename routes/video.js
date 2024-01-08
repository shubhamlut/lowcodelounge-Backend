const express = require("express");
const router = express.Router();
const config = require("../config");
const Video = require("../models/Videos");
const fetchUser = require("../middleware/fetchuser");

router.post("/addVideo", async (req, res) => {
  const video = await Video.create({
    name: req.body.name,
    description: req.body.description,
    duration: req.body.duration,
    videoId: req.body.videoId,
    thumbnail: req.body.thumbnail,
    courseId: req.body.courseId,
    index: req.body.index,
  });
  res.send(video);
});

router.get("/getVideos", async (req, res) => {
  let allVideos = await Video.find();
  console.log(allVideos);
  res.send(allVideos);
});

router.get("/getCourseVideos/:id", async (req, res) => {
  let allCourseVideos = await Video.find({ courseId: { $in: req.params.id } });

  res.send(allCourseVideos);
});

router.get("/getCourseVideos/:courseId/:indexId", async (req, res) => {
  let video = await Video.find({
    index: { $in: req.params.indexId },
    courseId: { $in: req.params.courseId },
  });
  res.send(video);
});

router.put("/updateVideo/:id",fetchUser,async (req,res) =>{
  let updatedVideo = await Video.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duration,
        videoId: req.body.videoId,
        thumbnail: req.body.thumbnail,
        courseId: req.body.courseId,
        index:req.body.index
      },
    },
    { new: true }
  );

  res.send(updatedVideo);
})

// router.post("/updateVideo/:id"),
//   async (req, res) => {
//     try {
//       console.log("test")
//       let id = await Video.findById(req.params.id);
//       if (!id) {
//         res.status(404).send("Not Found");
//       }
//       // video = await Video.findByIdAndUpdate(
//       //   req.params.id,
//       //   { $set: { name: "Cancelled",description:"" } },
//       //   { new: true }
//       // );
//       res.status(200).send(video);
//     } catch (error) {
//       res.status(400).send("Internal Server Error");
//     }
//   };

module.exports = router;
