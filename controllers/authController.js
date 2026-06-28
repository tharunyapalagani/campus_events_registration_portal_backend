const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken =
require("../utils/generateToken");

const signupUser = async (req, res) => {
  try {
    const { name, email, password, college, collegeId, branch } = req.body;

    const existingUser = await User.findOne({ 
      $or:[
        {email},
        {collegeId}
      ]
     });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or college id already exsists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      college,
      collegeId,
      branch
    });

    const token = generateToken(user._id);

    res.status(201).json({
      _id:user._id,
      name: user.name,
      email: user.email,
      college:user.college,
      collegeId: user.collegeId,
      branch: user.branch,token
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const token = generateToken(user._id);

    res.json({
       _id:user._id,
      name: user.name,
      email: user.email,
      college:user.college,
      collegeId: user.collegeId,
      branch: user.branch,token
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  signupUser,
  loginUser
};