const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      mobilenumber: req.body.mobilenumber,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET
      ).toString(),
      location: req.body.location,
    });
    try {
      await newUser.save();
      return res.status(200).json({ message: "Registered Successfully" });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(401)
          .json("Could not find the user with given credentials");
      }

      const decryptedpass = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET
      );
      const thepassword = decryptedpass.toString(CryptoJS.enc.Utf8);

      if (thepassword !== req.body.password) {
        return res.status(401).json("Wrong Password");
      }

      const userToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
      );

      const { password, __v, updatedAt, createdAt, ...others } = user._doc;
      return res.status(200).json({ ...others, token: userToken });
    } catch (err) {
      return res.status(500).json("Failed to Login check your credentials");
    }
  },
};
