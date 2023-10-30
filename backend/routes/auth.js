const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const fetchuser = require("../middleware/fetchuser");
const jwt = require("jsonwebtoken");
const JWT_auth = "Sahilkhan$191202";

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            errors: "Please enter valid email the email is already registered",
          });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        profile: req.body.profile,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_auth);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").exists({ min: 5 })],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Account Does Not Exists" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Password Entered Is Incorrect" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = await jwt.sign(data, JWT_auth);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = await req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

router.post(
  "/changepassword",
  [
    fetchuser,
    body("password").exists(),
    body("newPassword").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password, newPassword } = req.body;
    const userId = req.user.id;

    try {
      // Fetch the user from the database
      const user = await User.findById(userId);

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      // Check if the old password matches the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid old password" });
      }

      // Hash the new password
      const saltRounds = 10; // You can configure the number of salt rounds
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update the user's password in the database
      await User.findByIdAndUpdate(userId, { password: hashedPassword });

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);


module.exports = router;
