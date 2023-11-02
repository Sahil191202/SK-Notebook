const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const fetchuser = require("../middleware/fetchuser");
const jwt = require("jsonwebtoken");
const JWT_auth = "Sahilkhan$191202";
const otpgenerator = require('otp-generator');
const nodemailer = require('nodemailer');

  //opt vala code 
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "kingkhan120702@gmail.com",
      pass: "jxrb emxd bgru uifv",
    },
});

let sharedOTP = "";


router.post("/sendotp", async (req, res) => {
  const email = req.body.email;
  const otp = otpgenerator.generate(6, {
    integer: true,
    alphabets: false,
    specialChars: false,
  });
    sharedOTP = otp;
  try {
    // Send the OTP to the user's email
    const mailOptions = {
      from: "kingkhan120702@gmail.com",
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP for email verification is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error");
  }
});


router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
    body("profile"),
    body("otp")
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      const email = req.body.email;
      const providedOTP = req.body.otp;

      // Generate the OTP for the provided email (matching the one sent)
         const otp = sharedOTP;

      if (providedOTP !== otp) {
        return res.status(400).json({ success, message: "Invalid OTP" });
      }

      // If you reach this point, the OTP is valid, and you can proceed with user creation
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({
        name: req.body.name,
        email: email,
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
      res.status(500).send("Some Error");
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
      const user = await User.findById(userId);

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid old password" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      await User.findByIdAndUpdate(userId, { password: hashedPassword });

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);


module.exports = router;
