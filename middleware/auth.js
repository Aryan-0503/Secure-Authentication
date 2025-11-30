import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, "secret");
    const user = await User.findOne({ email: decoded.email });

    if (!user) return res.status(401).json({ message: "User not found" });

    // role check
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    req.user = user;

    // rate limit
    if (user.requests >= 10) {
      return res.status(429).json({ message: "User rate limit exceeded" });
    }

    user.requests += 1;
    await user.save();

    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
