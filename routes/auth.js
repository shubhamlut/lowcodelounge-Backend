const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");

//ROUTE #1: Create User
router.post(
  "/createUser", //endpoint
  [
    body("name", "Enter the valid name").isLength({ min: 6 }),
    body("email", "Enter the valid email").isEmail(),
    body("password", "Enter the valid password").isLength({ min: 6 }),
    body("location", "Enter the valid location").isLength({ min: 3 }),
    body("gender", "Enter the valid gender").isLength({ min: 4 }),
  ], //Validation

  async (req, res) => {
    // check if there are any validation errors
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if email already exists in the DB
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.json({
        errors: [{ msg: "Email already exists" }],
        success: false,
      });
    }

    try {
      //Encrypting the password
      let salt = await bcrypt.genSaltSync(10);
      let securedPassword = await bcrypt.hashSync(req.body.password, salt);

      //Creating the user entry in DB
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
        location: req.body.location,
        gender: req.body.gender,
      });

      //Generating  JWT Token
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtData = jwt.sign(data, config.secretKey);

      //Sending response to client
      return res.json({ jwtToken: jwtData, success: true });

      //Error Handling
    } catch (error) {
      res.json({
        error: "Something went wrong",
        message: error.message,
        success: false,
      });
    }
  }
);

//ROUTE #2: User Login

router.post(
  "/login",
  [
    body("email", "Enter the valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          success: false,
          error: "Please try to login with valid credentials",
        });
      }
      let passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success: false,
          error: "Please try to login with valid credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtData = jwt.sign(data, config.secretKey);
      res.status(200).json({
        userId:user._id,
        userName:user.name,
        success: true,
        jwtToken: jwtData,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

module.exports = router;
