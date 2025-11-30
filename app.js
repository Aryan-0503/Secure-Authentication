import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import { ipLimiter } from "./rateLimit.js";
import { auth } from "./middleware/auth.js";


const app = express();
app.use(express.json());

// connect DB
mongoose.connect("mongodb://127.0.0.1:27017/rateLimiterDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// --------------------- SIGNUP ---------------------
app.post("/signup", ipLimiter, async (req, res) => {
  const { email, password, role } = req.body;

  let existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed,
    role: role || "free",
  });

  return res.status(201).json({ message: "User created", user });
});

// app.get("/protected", auth, (req, res) => {
//   res.json({ message: "Welcome user", user: req.user });
// });
// --------------------- LOGIN ---------------------
app.post("/login", ipLimiter, async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });

  user.requests = 0; // reset user limit on login
  await user.save();

  return res.json({ message: "Logged in", token });
});


// --------------------- PROTECTED ROUTE ---------------------
app.get("/protected", auth, (req, res) => {
  res.json({
    message: "Access granted!",
    user: req.user.email,
    requests_used: req.user.requests
  });
});


// --------------------- RESET USER LIMIT ---------------------
app.post("/reset", async (req, res) => {
  await User.updateMany({}, { requests: 0 });
  res.json({ message: "All limits reset" });
});


app.listen(4000, () => console.log("Server running on 4000"));
