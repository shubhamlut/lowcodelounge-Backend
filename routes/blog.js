const express = require("express");
const router = express.Router();
const config = require("../config");
const Blog = require("../models/Blogs");

const fetchUser = require("../middleware/fetchuser")
// 1
router.post("/addBlog", async (req, res) => {
  const blog = await Blog.create({
    blogTitle: req.body.blogTitle,
    blog: req.body.blog,
    blogCategory: req.body.blogCategory,
  });
  res.send(blog);
});
// 2
router.get("/getBlogs", fetchUser, async (req, res) => {
  let blogs = await Blog.find();
  res.send(blogs);
});
//3
router.get("/getBlog/:id", async (req, res) => {
   try{

       let blog = await Blog.find({ _id: { $in: req.params.id } });
       res.send(blog);
    }catch(error){
        res.send(error)
    }
});

//4
router.post("/updateBlog/:id",fetchUser, async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        blogTitle: req.body.blogTitle,
        blog: req.body.blog,
        blogCategory: req.body.blogCategory,
      },
    },
    { new: true }
  );
  res.send(blog);
});
module.exports = router;
