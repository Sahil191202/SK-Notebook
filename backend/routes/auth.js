const express = require("express");
const routes = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_sec = "Aniskhan1234";

routes.post(
  "/createuser",
  [
    body("email", "Enter valid Email").isEmail(),
    body("name", "Enter Valid Name").isLength({ min: 5 }),
    body("password", "Enter valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, errors: "Sorry a  user With email already Exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      //   .then(user => res.json(user))
      //   .catch(err=> {
      // res.json({error : "Please Enter Valid Input" , message :err.message})})
      const data = {
        user: { id: user.id },
      };
      const token = jwt.sign(data, jwt_sec);
      success = true;
      res.json({ success, token });
    } catch (error) {
      console.log(error.message);
      res.status(5000).send("Some Error occured");
    }
  }
);

// login

routes.post(
  "/login",
  [
    body("email", "Enter valid Email").isEmail(),
    body("password", "Enter valid password").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, errors: "Please enter valid  credentails" });
      }
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        return res
          .status(400)
          .json({ success, errors: "Please enter valid  credentails" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = await jwt.sign(data, jwt_sec);
      success = true;
      res.json({ success, token });
    } catch (error) {
      success = false;
      console.log(error.message);
      res.status(5000).send(success, "Some Error occured");
    }
  }
);

// getuser

routes.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userID = await req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(5000).send("Some Error occured");
  }
});
module.exports = routes;
