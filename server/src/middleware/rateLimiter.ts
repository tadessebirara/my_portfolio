import rateLimit from "express-rate-limit";

// Strict limit for contact form (3 submissions per hour per IP)
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    success: false,
    error: "Too many inquiries from this IP. Please try again in an hour.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// General API limit
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    error: "Too many requests. Please slow down.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
