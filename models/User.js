import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "free" }, // free, premium, admin
  requests: { type: Number, default: 0 },   // user-based rate limit
});

const User = mongoose.model("User", userSchema);
export default User;
