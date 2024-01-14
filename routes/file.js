const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
const multer = require("multer");
const fs = require("fs");
const { btoa } = require("buffer");
const ProfilePhoto = require("../models/ProfilePhoto");
const fetchUser = require("../middleware/fetchuser");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/my-uploads");
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname);
  },
});

function arrayBufferToString(arrayBuffer) {
  let byteArray = new Uint16Array(arrayBuffer);
  let byteString = "";
  for (let i = 0; i < byteArray.length; i++) {
    byteString += String.fromCharCode(byteArray[i]);
  }
  return byteString;
}

const upload = multer({ storage: storage });

//Upload profile picture
router.post(
  "/upload",
  upload.single("uploaded_file"),
fetchUser,
   async function (req, res) {
    let retrievedPhoto = fs.readFileSync(
      "./public/my-uploads/" + req.file.originalname
    );
    let profilePic = new ProfilePhoto({
      user: req.user.id,
      picture: {
        data: retrievedPhoto,
        contentType: req.file.mimetype,
      },
    });
    await profilePic.save();

    res.json({
      success: true,
      message: "Successfully Update the profile picture",
    });
  }
);

module.exports = router;
