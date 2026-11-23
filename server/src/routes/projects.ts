
import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { randomUUID } from "crypto";

const router = Router();

/* ============================================================
   STORAGE CONFIGURATION
   ============================================================ */

const DATA_DIR = path.join(process.cwd(), "data");
const UPLOAD_DIR = path.join(process.cwd(), "uploads");
const DATA_FILE = path.join(DATA_DIR, "projects.json");

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

/* ============================================================
   PROJECT INTERFACE
   ============================================================ */

interface ProjectRecord {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  problem: string;
  solution: string;
  tags: string[];
  liveUrl: string;
  sourceUrl: string;
  footerLabel: string;
  hasLiveDemo: boolean;
  createdAt: string;
}

/* ============================================================
   JSON DATABASE HELPERS
   ============================================================ */

function readProjects(): ProjectRecord[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }

    const data = fs.readFileSync(DATA_FILE, "utf-8");

    if (!data.trim()) {
      return [];
    }

    const projects = JSON.parse(data);

    return Array.isArray(projects) ? projects : [];
  } catch (error) {
    console.error("Error reading projects:", error);
    return [];
  }
}

function writeProjects(projects: ProjectRecord[]): void {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(projects, null, 2),
    "utf-8"
  );
}

/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */

function parseTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((tag) => tag.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

function parseBoolean(value: unknown): boolean {
  return value === true || value === "true" || value === "1";
}

function getString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function deleteUploadedImage(imagePath: string): void {
  if (!imagePath || !imagePath.startsWith("/uploads/")) {
    return;
  }

  const filename = path.basename(imagePath);
  const fullPath = path.join(UPLOAD_DIR, filename);

  try {
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (error) {
    console.error("Could not delete image:", error);
  }
}

/* ============================================================
   MULTER IMAGE UPLOAD CONFIGURATION
   ============================================================ */

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, UPLOAD_DIR);
  },

  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const filename = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${extension}`;

    callback(null, filename);
  },
});

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

const upload = multer({
  storage,

  limits: {
    fileSize: 8 * 1024 * 1024,
  },

  fileFilter: (_req, file, callback) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(
        new Error("Only JPEG, PNG, WEBP, GIF, and AVIF images are allowed.")
      );
    }
  },
});

/* ============================================================
   ADMIN AUTHENTICATION MIDDLEWARE
   ============================================================ */

function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const configuredKey = process.env.ADMIN_KEY;
  const providedKey = req.headers["x-admin-key"];

  if (!configuredKey) {
    res.status(500).json({
      error: "ADMIN_KEY is not configured on the server.",
    });
    return;
  }

  if (typeof providedKey !== "string") {
    res.status(401).json({
      error: "Admin authentication required.",
    });
    return;
  }

  const configuredBuffer = Buffer.from(configuredKey);
  const providedBuffer = Buffer.from(providedKey);

  if (
    configuredBuffer.length !== providedBuffer.length ||
    !crypto.timingSafeEqual(configuredBuffer, providedBuffer)
  ) {
    res.status(401).json({
      error: "Invalid admin key.",
    });
    return;
  }

  next();
}

/* ============================================================
   ADMIN KEY VERIFICATION
   POST /admin/verify
   ============================================================ */

router.post("/admin/verify", (req: Request, res: Response) => {
  const configuredKey = process.env.ADMIN_KEY;
  const providedKey =
    req.body?.adminKey || req.body?.key || req.headers["x-admin-key"];

  if (!configuredKey) {
    res.status(500).json({
      error: "ADMIN_KEY is not configured on the server.",
    });
    return;
  }

  if (
    typeof providedKey !== "string" ||
    Buffer.byteLength(providedKey) !== Buffer.byteLength(configuredKey) ||
    !crypto.timingSafeEqual(
      Buffer.from(providedKey),
      Buffer.from(configuredKey)
    )
  ) {
    res.status(401).json({
      error: "Invalid admin key.",
    });
    return;
  }

  res.json({
    success: true,
    message: "Admin authenticated successfully.",
  });
});

/* ============================================================
   GET ALL PROJECTS
   GET /
   ============================================================ */

router.get("/", (_req: Request, res: Response) => {
  const projects = readProjects();

  res.json(projects);
});

/* ============================================================
   GET SINGLE PROJECT
   GET /:id
   ============================================================ */

router.get("/:id", (req: Request, res: Response) => {
  const projects = readProjects();

  const project = projects.find(
    (item) => item.id === req.params.id
  );

  if (!project) {
    res.status(404).json({
      error: "Project not found.",
    });
    return;
  }

  res.json(project);
});

/* ============================================================
   CREATE PROJECT
   POST /
   ============================================================ */

router.post(
  "/",
  requireAdmin,
  upload.single("image"),
  (req: Request, res: Response) => {
    try {
      const {
        title,
        subtitle,
        category,
        problem,
        solution,
        liveUrl,
        sourceUrl,
        footerLabel,
        hasLiveDemo,
      } = req.body;

      if (!title || !String(title).trim()) {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }

        res.status(400).json({
          error: "Project title is required.",
        });
        return;
      }

      const projects = readProjects();

      const newProject: ProjectRecord = {
        id: randomUUID(),
        title: getString(title),
        subtitle: getString(subtitle),
        category: getString(category),
        image: req.file
          ? `/uploads/${req.file.filename}`
          : "",
        problem: getString(problem),
        solution: getString(solution),
        tags: parseTags(req.body.tags),
        liveUrl: getString(liveUrl),
        sourceUrl: getString(sourceUrl),
        footerLabel: getString(footerLabel),
        hasLiveDemo: parseBoolean(hasLiveDemo),
        createdAt: new Date().toISOString(),
      };

      projects.unshift(newProject);

      writeProjects(projects);

      res.status(201).json(newProject);
    } catch (error) {
      if (req.file) {
        deleteUploadedImage(`/uploads/${req.file.filename}`);
      }

      console.error("Create project error:", error);

      res.status(500).json({
        error: "Could not create project.",
      });
    }
  }
);

/* ============================================================
   UPDATE PROJECT
   PUT /:id

   IMPORTANT:
   - Supports editing project details.
   - Keeps the existing image if no new image is uploaded.
   - Replaces the image if a new image is uploaded.
   ============================================================ */

router.put(
  "/:id",
  requireAdmin,
  upload.single("image"),
  (req: Request, res: Response) => {
    try {
      const projects = readProjects();

      const projectIndex = projects.findIndex(
        (item) => item.id === req.params.id
      );

      if (projectIndex === -1) {
        if (req.file) {
          deleteUploadedImage(`/uploads/${req.file.filename}`);
        }

        res.status(404).json({
          error: "Project not found.",
        });
        return;
      }

      const existingProject = projects[projectIndex];

      const {
        title,
        subtitle,
        category,
        problem,
        solution,
        liveUrl,
        sourceUrl,
        footerLabel,
        hasLiveDemo,
        tags,
      } = req.body;

      if (
        title !== undefined &&
        !String(title).trim()
      ) {
        if (req.file) {
          deleteUploadedImage(`/uploads/${req.file.filename}`);
        }

        res.status(400).json({
          error: "Project title cannot be empty.",
        });
        return;
      }

      const updatedProject: ProjectRecord = {
        ...existingProject,

        title:
          title !== undefined
            ? getString(title)
            : existingProject.title,

        subtitle:
          subtitle !== undefined
            ? getString(subtitle)
            : existingProject.subtitle,

        category:
          category !== undefined
            ? getString(category)
            : existingProject.category,

        problem:
          problem !== undefined
            ? getString(problem)
            : existingProject.problem,

        solution:
          solution !== undefined
            ? getString(solution)
            : existingProject.solution,

        tags:
          tags !== undefined
            ? parseTags(tags)
            : existingProject.tags,

        liveUrl:
          liveUrl !== undefined
            ? getString(liveUrl)
            : existingProject.liveUrl,

        sourceUrl:
          sourceUrl !== undefined
            ? getString(sourceUrl)
            : existingProject.sourceUrl,

        footerLabel:
          footerLabel !== undefined
            ? getString(footerLabel)
            : existingProject.footerLabel,

        hasLiveDemo:
          hasLiveDemo !== undefined
            ? parseBoolean(hasLiveDemo)
            : existingProject.hasLiveDemo,

        // Preserve the old image unless a new one is uploaded.
        image: req.file
          ? `/uploads/${req.file.filename}`
          : existingProject.image,

        // Preserve the original creation date.
        createdAt: existingProject.createdAt,
      };

      projects[projectIndex] = updatedProject;

      writeProjects(projects);

      // Delete the old image only after the updated record is saved.
      if (req.file && existingProject.image) {
        deleteUploadedImage(existingProject.image);
      }

      res.json(updatedProject);
    } catch (error) {
      if (req.file) {
        deleteUploadedImage(`/uploads/${req.file.filename}`);
      }

      console.error("Update project error:", error);

      res.status(500).json({
        error: "Could not update project.",
      });
    }
  }
);

/* ============================================================
   DELETE PROJECT
   DELETE /:id
   ============================================================ */

router.delete(
  "/:id",
  requireAdmin,
  (req: Request, res: Response) => {
    try {
      const projects = readProjects();

      const projectIndex = projects.findIndex(
        (item) => item.id === req.params.id
      );

      if (projectIndex === -1) {
        res.status(404).json({
          error: "Project not found.",
        });
        return;
      }

      const deletedProject = projects[projectIndex];

      projects.splice(projectIndex, 1);

      writeProjects(projects);

      if (deletedProject.image) {
        deleteUploadedImage(deletedProject.image);
      }

      res.json({
        success: true,
        message: "Project deleted successfully.",
        id: deletedProject.id,
      });
    } catch (error) {
      console.error("Delete project error:", error);

      res.status(500).json({
        error: "Could not delete project.",
      });
    }
  }
);

/* ============================================================
   MULTER ERROR HANDLER
   ============================================================ */

router.use(
  (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    if (error instanceof multer.MulterError) {
      res.status(400).json({
        error:
          error.code === "LIMIT_FILE_SIZE"
            ? "Image size must not exceed 8MB."
            : error.message,
      });
      return;
    }

    if (error) {
      res.status(400).json({
        error: error.message || "File upload failed.",
      });
    }
  }
);

export default router;
