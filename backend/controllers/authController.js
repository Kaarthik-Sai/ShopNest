import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = User.create({ name, email, password: hashedPassword });
    if (newUser) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const message = `
      Welcome to Shopnest, ${name}! Thank you for registering with us. We are excited blah blah blah
      Your OTP for shopnest registeration is ${otp}`;

      await sendEmail(
        email,
        "Welcome to Shopnest, Your OTP for shopnest registeration is ${otp}Your OTP for shopnest registeration is ${otp}",
        message,
      );
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.removeListener,
        token: generateToken(newUser._id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { registerUser, loginUser, getUser };
