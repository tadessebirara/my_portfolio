import express from "express";
import cors from "cors";
import helmet from "helmet";

import { env } from "./config/env.js";
import { UPLOAD_DIR } from "./config/storage.js";

import { apiLimiter } from "./middleware/rateLimiter.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

import { verifyEmailConnection } from "./services/emailService.js";

import contactRoutes from "./routes/contact.js";
import healthRoutes from "./routes/health.js";
import projectRoutes from "./routes/projects.js";

const app = express();

/* ============================================================
   PROXY CONFIGURATION
   ============================================================ */

app.set("trust proxy", 1);

/* ============================================================
   CORS CONFIGURATION
   ============================================================ */

// Add deployed frontend origins through CLIENT_URL.
// Multiple origins can be separated with commas.
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  ...env.CLIENT_URL.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked this origin: ${origin}`));
    },

    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization", "x-admin-key"],

    credentials: false,
    optionsSuccessStatus: 204,
  }),
);

/* ============================================================
   SECURITY CONFIGURATION
   ============================================================ */

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
  }),
);

/* ============================================================
   BODY PARSING
   ============================================================ */

app.use(express.json({ limit: "10kb" }));

/* ============================================================
   PERSISTENT IMAGE STORAGE
   ============================================================ */

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

/* ============================================================
   API RATE LIMITING
   ============================================================ */

app.use("/api", apiLimiter);

/* ============================================================
   API ROUTES
   ============================================================ */

app.use("/api/health", healthRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);

/* ============================================================
   ROOT ROUTE
   ============================================================ */

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    service: "Portfolio API",
    status: "running",
    message: "Backend is successfully connected and running.",
  });
});

/* ============================================================
   ERROR HANDLING
   ============================================================ */

app.use(notFoundHandler);
app.use(errorHandler);

/* ============================================================
   SERVER STARTUP
   ============================================================ */

const PORT = Number(process.env.PORT) || env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${env.NODE_ENV}`);
  console.log(`Storage directory: ${UPLOAD_DIR}`);
  console.log(`ADMIN_KEY loaded: ${process.env.ADMIN_KEY ? "yes" : "NO"}`);

  try {
    await verifyEmailConnection();
  } catch (error) {
    console.error("Email connection verification failed:", error);
  }
});
