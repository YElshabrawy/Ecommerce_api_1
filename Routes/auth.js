const router = require("express").Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) res.status(401).json("Invalid Username!");

    const originalPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password)
      res.status(401).json("Invalid Password");

    //send all but password
    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
