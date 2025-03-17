import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthrized user",
      });
    }
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userData;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default isAuth;
