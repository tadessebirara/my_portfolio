import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import fs from "fs";

import { env } from "./config/env.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

import { verifyEmailConnection } from "./services/emailService.js";
import contactRoutes from "./routes/contact.js";
import healthRoutes from "./routes/health.js";
import projectRoutes from "./routes/projects.js";

const app = express();

app.set("trust proxy", 1);

// ==========================================
// CORS CONFIGURATION
// ==========================================

// IMPORTANT:
// These must be frontend origins, not backend API URLs.
// Add your actual deployed frontend domain here.
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://my-portfolio-4-q2tj.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // (e.g. server-to-server requests and health checks).
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked this origin: ${origin}`));
    },

    // Allow all methods used by the API.
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    // Allow headers used by frontend requests.
    allowedHeaders: ["Content-Type", "Authorization", "x-admin-key"],

    credentials: false,
    optionsSuccessStatus: 204,
  }),
);

// ==========================================
// SECURITY CONFIGURATION
// ==========================================

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
  }),
);

// ==========================================
// BODY PARSING
// ==========================================

app.use(express.json({ limit: "10kb" }));

// ==========================================
// FILE UPLOAD CONFIGURATION
// ==========================================

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(
  "/uploads",
  express.static(UPLOAD_DIR, {
    maxAge: "1d",
    setHeaders: (res) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      res.setHeader("Access-Control-Allow-Origin", "*");
    },
  }),
);

// ==========================================
// API RATE LIMITING
// ==========================================

app.use("/api", apiLimiter);

// ==========================================
// API ROUTES
// ==========================================

app.use("/api/health", healthRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);

// ==========================================
// ROOT ROUTE
// ==========================================

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    service: "Portfolio API",
    status: "running",
    message: "Backend is successfully connected and running.",
  });
});

// ==========================================
// ERROR HANDLING
// ==========================================

app.use(notFoundHandler);
app.use(errorHandler);

// ==========================================
// SERVER STARTUP
// ==========================================

const PORT = Number(process.env.PORT) || env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔑 ADMIN_KEY loaded: ${process.env.ADMIN_KEY ? "yes" : "NO"}`);

  try {
    await verifyEmailConnection();
  } catch (error) {
    console.error("Email connection verification failed:", error);
  }
});
