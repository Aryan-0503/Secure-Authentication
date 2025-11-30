import rateLimit from "express-rate-limit";

// 🌍 IP-based rate limit
export const ipLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,   // 1 min
  max: 5,                    // 5 requests per minute per IP
  message: "Too many requests from this IP"
});
