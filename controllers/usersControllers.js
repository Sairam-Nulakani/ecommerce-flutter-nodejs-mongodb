const User = require("../models/User");
module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const { password, __v, updatedAt, createdAt, ...userData } = user._doc;
      res.status(200).json(userData);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.user.id);
      res.status(200).json("User Deleted Successfully");
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
};
