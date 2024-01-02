const express = require("express");
const router = express.Router();
const config = require("../config");
const Course = require("../models/Courses");

router.post("/addCourse", async (req, res) => {
  const course = await Course.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
  });
  res.send(course);
});

router.get("/getCourses", async (req, res) => {
    let allCourses = await Course.find();
    res.send(allCourses);
  });
module.exports = router;
