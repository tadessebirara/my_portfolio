import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";

import multer from "multer";
import crypto from "crypto";
import path from "path";

import { supabase } from "../config/supabase.js";

const router = Router();

const BUCKET_NAME = "project-images";

/* ============================================================
   PROJECT TYPES
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

interface DatabaseProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  problem: string;
  solution: string;
  tags: string[];
  live_url: string;
  source_url: string;
  footer_label: string;
  has_live_demo: boolean;
  created_at: string;
  updated_at: string;
}

/* ============================================================
   DATABASE MAPPING
   ============================================================ */

function mapProject(row: DatabaseProject): ProjectRecord {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    category: row.category,
    image: row.image,
    problem: row.problem,
    solution: row.solution,
    tags: row.tags || [],
    liveUrl: row.live_url,
    sourceUrl: row.source_url,
    footerLabel: row.footer_label,
    hasLiveDemo: row.has_live_demo,
    createdAt: row.created_at,
  };
}

/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */

function parseTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map(String)
      .map((tag) => tag.trim())
      .filter(Boolean);
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

/* ============================================================
   IMAGE VALIDATION
   ============================================================ */

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 8 * 1024 * 1024,
  },

  fileFilter: (_req, file, callback) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(
        new Error("Only JPEG, PNG, WEBP, GIF, and AVIF images are allowed."),
      );
    }
  },
});

/* ============================================================
   SUPABASE IMAGE UPLOAD
   ============================================================ */

const extensionByMimeType: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};

async function uploadProjectImage(file: Express.Multer.File): Promise<string> {
  const extension =
    extensionByMimeType[file.mimetype] ||
    path.extname(file.originalname).toLowerCase();

  const filename = `${Date.now()}-${crypto.randomUUID()}${extension}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filename, file.buffer, {
      contentType: file.mimetype,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Supabase image upload error:", error);
    throw new Error("Could not upload project image.");
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filename);

  return data.publicUrl;
}

/* ============================================================
   SUPABASE IMAGE DELETION
   ============================================================ */

async function deleteUploadedImage(imageUrl: string): Promise<void> {
  if (!imageUrl) return;

  try {
    const parsedUrl = new URL(imageUrl);

    const expectedOrigin = new URL(process.env.SUPABASE_URL || "").origin;

    const storagePrefix = "/storage/v1/object/public/project-images/";

    if (
      parsedUrl.origin !== expectedOrigin ||
      !parsedUrl.pathname.startsWith(storagePrefix)
    ) {
      return;
    }

    const objectPath = decodeURIComponent(
      parsedUrl.pathname.slice(storagePrefix.length),
    );

    if (!objectPath || objectPath.includes("..")) {
      return;
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([objectPath]);

    if (error) {
      console.error("Supabase image deletion error:", error);
    }
  } catch (error) {
    console.error("Could not delete project image:", error);
  }
}

/* ============================================================
   ADMIN AUTHENTICATION
   ============================================================ */

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
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
   POST /api/projects/admin/verify
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
      Buffer.from(configuredKey),
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
   GET /api/projects
   ============================================================ */

router.get("/", async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get projects error:", error);

      res.status(500).json({
        error: "Could not retrieve projects.",
      });
      return;
    }

    res.json((data || []).map((row) => mapProject(row as DatabaseProject)));
  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      error: "Could not retrieve projects.",
    });
  }
});

/* ============================================================
   GET SINGLE PROJECT
   GET /api/projects/:id
   ============================================================ */

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", req.params.id)
      .maybeSingle();

    if (error) {
      console.error("Get project error:", error);

      res.status(500).json({
        error: "Could not retrieve project.",
      });
      return;
    }

    if (!data) {
      res.status(404).json({
        error: "Project not found.",
      });
      return;
    }

    res.json(mapProject(data as DatabaseProject));
  } catch (error) {
    console.error("Get project error:", error);

    res.status(500).json({
      error: "Could not retrieve project.",
    });
  }
});

/* ============================================================
   CREATE PROJECT
   POST /api/projects
   ============================================================ */

router.post(
  "/",
  requireAdmin,
  upload.single("image"),
  async (req: Request, res: Response) => {
    let uploadedImageUrl = "";

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
        res.status(400).json({
          error: "Project title is required.",
        });
        return;
      }

      if (req.file) {
        uploadedImageUrl = await uploadProjectImage(req.file);
      }

      const projectData = {
        id: crypto.randomUUID(),
        title: getString(title),
        subtitle: getString(subtitle),
        category: getString(category),
        image: uploadedImageUrl,
        problem: getString(problem),
        solution: getString(solution),
        tags: parseTags(req.body.tags),
        live_url: getString(liveUrl),
        source_url: getString(sourceUrl),
        footer_label: getString(footerLabel),
        has_live_demo: parseBoolean(hasLiveDemo),
      };

      const { data, error } = await supabase
        .from("projects")
        .insert(projectData)
        .select("*")
        .single();

      if (error) {
        console.error("Create project database error:", error);

        if (uploadedImageUrl) {
          await deleteUploadedImage(uploadedImageUrl);
        }

        res.status(500).json({
          error: "Could not create project.",
        });
        return;
      }

      res.status(201).json(mapProject(data as DatabaseProject));
    } catch (error) {
      console.error("Create project error:", error);

      if (uploadedImageUrl) {
        await deleteUploadedImage(uploadedImageUrl);
      }

      res.status(500).json({
        error: "Could not create project.",
      });
    }
  },
);

/* ============================================================
   UPDATE PROJECT
   PUT /api/projects/:id
   ============================================================ */

router.put(
  "/:id",
  requireAdmin,
  upload.single("image"),
  async (req: Request, res: Response) => {
    let uploadedImageUrl = "";

    try {
      const { data: existingData, error: findError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", req.params.id)
        .maybeSingle();

      if (findError) {
        console.error("Find project error:", findError);

        res.status(500).json({
          error: "Could not retrieve project.",
        });
        return;
      }

      if (!existingData) {
        res.status(404).json({
          error: "Project not found.",
        });
        return;
      }

      const existingProject = mapProject(existingData as DatabaseProject);

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

      if (title !== undefined && !String(title).trim()) {
        res.status(400).json({
          error: "Project title cannot be empty.",
        });
        return;
      }

      if (req.file) {
        uploadedImageUrl = await uploadProjectImage(req.file);
      }

      const updatedData: Record<string, unknown> = {
        title: title !== undefined ? getString(title) : existingProject.title,

        subtitle:
          subtitle !== undefined
            ? getString(subtitle)
            : existingProject.subtitle,

        category:
          category !== undefined
            ? getString(category)
            : existingProject.category,

        problem:
          problem !== undefined ? getString(problem) : existingProject.problem,

        solution:
          solution !== undefined
            ? getString(solution)
            : existingProject.solution,

        tags: tags !== undefined ? parseTags(tags) : existingProject.tags,

        live_url:
          liveUrl !== undefined ? getString(liveUrl) : existingProject.liveUrl,

        source_url:
          sourceUrl !== undefined
            ? getString(sourceUrl)
            : existingProject.sourceUrl,

        footer_label:
          footerLabel !== undefined
            ? getString(footerLabel)
            : existingProject.footerLabel,

        has_live_demo:
          hasLiveDemo !== undefined
            ? parseBoolean(hasLiveDemo)
            : existingProject.hasLiveDemo,

        updated_at: new Date().toISOString(),
      };

      if (uploadedImageUrl) {
        updatedData.image = uploadedImageUrl;
      }

      const { data, error } = await supabase
        .from("projects")
        .update(updatedData)
        .eq("id", req.params.id)
        .select("*")
        .single();

      if (error) {
        console.error("Update project error:", error);

        if (uploadedImageUrl) {
          await deleteUploadedImage(uploadedImageUrl);
        }

        res.status(500).json({
          error: "Could not update project.",
        });
        return;
      }

      if (uploadedImageUrl && existingProject.image) {
        await deleteUploadedImage(existingProject.image);
      }

      res.json(mapProject(data as DatabaseProject));
    } catch (error) {
      console.error("Update project error:", error);

      if (uploadedImageUrl) {
        await deleteUploadedImage(uploadedImageUrl);
      }

      res.status(500).json({
        error: "Could not update project.",
      });
    }
  },
);

/* ============================================================
   DELETE PROJECT
   DELETE /api/projects/:id
   ============================================================ */

router.delete("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { data: existingData, error: findError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", req.params.id)
      .maybeSingle();

    if (findError) {
      console.error("Find project error:", findError);

      res.status(500).json({
        error: "Could not retrieve project.",
      });
      return;
    }

    if (!existingData) {
      res.status(404).json({
        error: "Project not found.",
      });
      return;
    }

    const deletedProject = mapProject(existingData as DatabaseProject);

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", req.params.id);

    if (error) {
      console.error("Delete project error:", error);

      res.status(500).json({
        error: "Could not delete project.",
      });
      return;
    }

    if (deletedProject.image) {
      await deleteUploadedImage(deletedProject.image);
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
});

/* ============================================================
   MULTER ERROR HANDLER
   ============================================================ */

router.use(
  (error: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof multer.MulterError) {
      res.status(400).json({
        error:
          error.code === "LIMIT_FILE_SIZE"
            ? "Image size must not exceed 8MB."
            : error.message,
      });
      return;
    }

    res.status(400).json({
      error: error.message || "File upload failed.",
    });
  },
);

export default router;
