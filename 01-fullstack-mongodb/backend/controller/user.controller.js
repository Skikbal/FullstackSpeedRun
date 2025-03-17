import User from "../model/User.model.js";
import crypto from "crypto";
import sendMail from "../utils/nodemailer.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { error } from "console";

//function for creating token
function createRandomToken() {
  return crypto.randomBytes(32).toString("hex");
}

//function for formating response
const responseHandler = (
  res,
  statusCode = 500,
  message = "Something went wrong",
  success = false,
  data = null,
  error = null
) => {
  const responseObject = { success, message };
  if (data) responseObject.data = data;
  if (error) responseObject.error = error;

  return res.status(statusCode).json(responseObject);
};

// User Registration
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return responseHandler(res, 400, "All fields are required.");
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return responseHandler(
        res,
        400,
        "User already registered. Please log in."
      );
    }

    // Create new user
    const user = await User.create({ name, email, password });
    if (!user) {
      return responseHandler(
        res,
        500,
        "User registration failed. Please try again."
      );
    }

    // Generate verification token
    const token = createRandomToken();
    const verificationLink = `${process.env.BASE_URL}/user/verify/${token}`;
    user.verificationToken = token;
    await user.save();

    // Send verification email
    await sendMail(
      email,
      "Verify Your Email",
      `Click the link to verify your email: ${verificationLink}`,
      `<h1>Hello ${name},</h1><p>Welcome! Click <a href="${verificationLink}">here</a> to verify your account.</p>`
    );

    responseHandler(
      res,
      201,
      "User registered successfully. Please verify your email.",
      true
    );
  } catch (err) {
    return responseHandler(
      res,
      500,
      "Internal server error. Please try again later.",
      false,
      null,
      err.message
    );
  }
};

// User Email Verification
const verifyUser = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return responseHandler(res, 400, "Invalid or missing verification token.");
  }

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return responseHandler(
        res,
        400,
        "Invalid or expired verification token."
      );
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    responseHandler(
      res,
      200,
      "Email verification successful. You can now log in.",
      true
    );
  } catch (err) {
    console.error(err);
    return responseHandler(
      res,
      500,
      "Internal server error.",
      false,
      null,
      err.message
    );
  }
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return responseHandler(res, 400, "Email and password are required.");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return responseHandler(
        res,
        404,
        "User not found. Please register first."
      );
    }

    if (!user.isVerified) {
      return responseHandler(
        res,
        403,
        "Please verify your email before logging in."
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return responseHandler(res, 401, "Incorrect email or password.");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    responseHandler(res, 200, "Login successful.", true, {
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    return responseHandler(
      res,
      500,
      "Internal server error.",
      false,
      null,
      err.message
    );
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return responseHandler(res, 404, "User not found.");
    }

    responseHandler(res, 200, "User profile fetched successfully.", true, user);
  } catch (err) {
    console.error(err);
    return responseHandler(
      res,
      500,
      "Internal server error.",
      false,
      null,
      err.message
    );
  }
};

// Forgot Password
const forgetUserPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return responseHandler(res, 400, "Email is required.");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return responseHandler(res, 404, "No user found with this email.");
    }

    if (!user.isVerified) {
      return responseHandler(
        res,
        403,
        "Please verify your email before resetting the password."
      );
    }

    const token = createRandomToken();
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const resetUrl = `${process.env.BASE_URL}/user/reset-password/${token}`;
    await sendMail(
      email,
      "Reset Password",
      `Click the link to reset your password: ${resetUrl}`,
      `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 10 minutes.</p>`
    );

    responseHandler(res, 200, "Password reset link sent to your email.", true);
  } catch (err) {
    console.error(err);
    return responseHandler(
      res,
      500,
      "Internal server error.",
      false,
      null,
      err.message
    );
  }
};

// Reset Password
const resetUserPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confpassword } = req.body;

  if (!password || !confpassword || password !== confpassword) {
    return responseHandler(res, 400, "Passwords do not match.");
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return responseHandler(
        res,
        400,
        "Invalid or expired password reset token."
      );
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    responseHandler(
      res,
      200,
      "Password reset successfully. You can now log in.",
      true
    );
  } catch (err) {
    console.error(err);
    return responseHandler(
      res,
      500,
      "Internal server error.",
      false,
      null,
      err.message
    );
  }
};

// Logout
const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  responseHandler(res, 200, "Logged out successfully.", true);
};

export {
  registerUser,
  verifyUser,
  loginUser,
  getUserProfile,
  forgetUserPassword,
  resetUserPassword,
  logout,
};
