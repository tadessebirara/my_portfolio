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

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
  }),
);

app.use(
  cors({
    origin: true, // reflect the requesting origin (dev + prod both work)
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-admin-key"],
    credentials: false,
  }),
);

app.use(express.json({ limit: "10kb" }));

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

app.use("/api", apiLimiter);
app.use("/api/health", healthRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (_req, res) =>
  res.json({ service: "Portfolio API", status: "running" }),
);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.PORT, async () => {
  console.log(`\n🚀 Server running on http://localhost:${env.PORT}`);
  console.log(
    `🔑 ADMIN_KEY loaded: ${process.env.ADMIN_KEY ? "yes (" + process.env.ADMIN_KEY.length + " chars)" : "NO"}`,
  );
  await verifyEmailConnection();
});
