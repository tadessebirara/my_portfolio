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
   STORAGE
   ============================================================ */
const DATA_DIR = path.join(process.cwd(), "data");
const UPLOAD_DIR = path.join(process.cwd(), "uploads");
const DATA_FILE = path.join(DATA_DIR, "projects.json");

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

export interface ProjectRecord {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string | null;
  problem: string;
  solution: string;
  tags: string[];
  liveUrl: string;
  sourceUrl: string;
  footerLabel: string;
  hasLiveDemo: boolean;
  createdAt: string;
}

function readProjects(): ProjectRecord[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as ProjectRecord[];
  } catch {
    return [];
  }
}

function writeProjects(list: ProjectRecord[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
}

/* ============================================================
   MULTER — IMAGE UPLOAD
   ============================================================ */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".png";
    const name = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, name);
  },
});

const ALLOWED = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

/* ============================================================
   ADMIN KEY GUARD
   ============================================================ */
function clean(value: string | undefined): string {
  return (value ?? "").trim().replace(/^["']|["']$/g, "");
}

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const expected = clean(process.env.ADMIN_KEY);

  if (!expected) {
    console.error("[admin] ADMIN_KEY is not configured on the server.");

    res.status(500).json({
      error: "Admin key is not configured on the server.",
    });
    return;
  }

  const provided = clean(req.header("x-admin-key"));

  const a = Buffer.from(provided, "utf8");
  const b = Buffer.from(expected, "utf8");

  const valid = a.length === b.length && crypto.timingSafeEqual(a, b);

  if (!valid) {
    // Never log the submitted or expected admin key.
    console.warn("[admin] Unauthorized admin request rejected.");

    res.status(401).json({
      error: "Unauthorized. Invalid admin key.",
    });
    return;
  }

  next();
}

/* ============================================================
   VERIFY ADMIN KEY
   ============================================================ */
router.post(
  "/admin/verify",
  requireAdmin,
  (_req: Request, res: Response): void => {
    res.json({ ok: true });
  },
);

/* ============================================================
   GET ALL PROJECTS — PUBLIC
   ============================================================ */
router.get("/", (_req: Request, res: Response): void => {
  const list = readProjects();
  res.json(list);
});

/* ============================================================
   GET PROJECT BY ID — PUBLIC
   ============================================================ */
router.get("/:id", (req: Request, res: Response): void => {
  const list = readProjects();
  const found = list.find((project) => project.id === req.params.id);

  if (!found) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  res.json(found);
});

/* ============================================================
   CREATE PROJECT — ADMIN ONLY
   ============================================================ */
router.post(
  "/",
  requireAdmin,
  upload.single("image"),
  (req: Request, res: Response): void => {
    const body = req.body as Record<string, string>;

    const title = (body.title || "").trim();

    if (!title) {
      if (req.file) {
        fs.unlink(req.file.path, () => {});
      }

      res.status(400).json({
        error: "Project title is required",
      });
      return;
    }

    let tags: string[] = [];

    if (typeof body.tags === "string" && body.tags.trim()) {
      tags = body.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }

    const record: ProjectRecord = {
      id: randomUUID(),
      title,
      subtitle: (body.subtitle || "").trim(),
      category: (body.category || "Other").trim(),
      image: req.file ? req.file.filename : null,
      problem: (body.problem || "").trim(),
      solution: (body.solution || "").trim(),
      tags,
      liveUrl: (body.liveUrl || "").trim(),
      sourceUrl: (body.sourceUrl || "").trim(),
      footerLabel: (body.footerLabel || "").trim(),
      hasLiveDemo: body.hasLiveDemo === "true" || body.hasLiveDemo === "on",
      createdAt: new Date().toISOString(),
    };

    const list = readProjects();
    list.push(record);
    writeProjects(list);

    console.log(`[projects] attached "${title}" (id: ${record.id})`);

    res.status(201).json(record);
  },
);

/* ============================================================
   DELETE PROJECT — ADMIN ONLY
   ============================================================ */
router.delete("/:id", requireAdmin, (req: Request, res: Response): void => {
  const list = readProjects();

  const index = list.findIndex((project) => project.id === req.params.id);

  if (index === -1) {
    res.status(404).json({
      error: "Project not found",
    });
    return;
  }

  const [removed] = list.splice(index, 1);

  if (!removed) {
    res.status(404).json({
      error: "Project not found",
    });
    return;
  }

  writeProjects(list);

  if (removed.image) {
    const filePath = path.join(UPLOAD_DIR, removed.image);
    fs.unlink(filePath, () => {});
  }

  console.log(`[projects] deleted "${removed.title}" (id: ${removed.id})`);

  res.json({
    ok: true,
    deletedId: removed.id,
  });
});

export default router;
