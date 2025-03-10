import User from "../model/User.model.js";
import crypto from "crypto";
import sendMail from "../utils/nodemailer.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { error } from "console";
//registration function
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //check if user is already exist
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    //create user
    const user = await User.create({ name, email, password });

    if (!user) {
      return res.status(400).json({ message: "User not registered" });
    }
    const token = crypto.randomBytes(32).toString("hex");
    const link = `${process.env.BASE_URL}/user/verify/${token}`;
    user.verificationToken = token;
    await user.save();
    await sendMail(
      email,
      "Verify your email",
      `Please click on the following link: ${link}`,
      `<h1>Hello ${name},</h1><p>Welcome onboard!</p><a href=${link}>click here</a>`
    );
    res.status(201).json({ message: "user created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "User not registered", error: err });
  }
};
//verify user
const verifyUser = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({ message: "invalid token" });
  }
  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "invalid token" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    return res.status(200).json({ message: "user verification successfull" });
  } catch (err) {
    return res.status(400).json({ message: "invalid token" });
  }
};

const loginUser = async () => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 600 * 1000,
    };
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(400).json({ message: "login failed" });
  }
};

export { registerUser, verifyUser, loginUser };
