import fs from "node:fs";
import path from "node:path";
import { supabase } from "../src/config/supabase.js";

interface LocalProject {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  image: string;
  problem?: string;
  solution?: string;
  tags?: string[];
  liveUrl?: string;
  sourceUrl?: string;
  footerLabel?: string;
  hasLiveDemo?: boolean;
  createdAt?: string;
}

const DATA_FILE = path.resolve("data/projects.json");
const UPLOADS_DIR = path.resolve("uploads");
const BUCKET_NAME = "project-images";

async function migrate() {
  console.log("Starting portfolio migration...");

  if (!fs.existsSync(DATA_FILE)) {
    throw new Error(`Project data file not found: ${DATA_FILE}`);
  }

  const projects: LocalProject[] = JSON.parse(
    fs.readFileSync(DATA_FILE, "utf8"),
  );

  if (!Array.isArray(projects) || projects.length === 0) {
    throw new Error("No projects found in projects.json.");
  }

  const databaseProjects = [];

  for (const project of projects) {
    console.log(`\nProcessing: ${project.title}`);

    let imageUrl = project.image || "";

    if (imageUrl && !/^https?:\/\//i.test(imageUrl)) {
      const filename = path.basename(imageUrl);
      const imagePath = path.join(UPLOADS_DIR, filename);

      if (!fs.existsSync(imagePath)) {
        throw new Error(`Image file not found: ${imagePath}`);
      }

      const extension = path.extname(filename).toLowerCase();

      const contentTypes: Record<string, string> = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp",
        ".gif": "image/gif",
        ".avif": "image/avif",
      };

      const contentType = contentTypes[extension];

      if (!contentType) {
        throw new Error(`Unsupported image type: ${extension}`);
      }

      const fileBuffer = fs.readFileSync(imagePath);

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filename, fileBuffer, {
          contentType,
          upsert: true,
        });

      if (uploadError) {
        throw new Error(
          `Image upload failed for ${filename}: ${uploadError.message}`,
        );
      }

      const { data } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filename);

      imageUrl = data.publicUrl;

      console.log(`Image uploaded: ${filename}`);
    } else {
      console.log("Image already uses a public URL or is empty.");
    }

    databaseProjects.push({
      id: project.id,
      title: project.title,
      subtitle: project.subtitle || "",
      category: project.category || "",
      image: imageUrl,
      problem: project.problem || "",
      solution: project.solution || "",
      tags: project.tags || [],
      live_url: project.liveUrl || "",
      source_url: project.sourceUrl || "",
      footer_label: project.footerLabel || "",
      has_live_demo: project.hasLiveDemo ?? false,
      created_at: project.createdAt || new Date().toISOString(),
      updated_at: project.createdAt || new Date().toISOString(),
    });
  }

  console.log("\nSaving project records to Supabase...");

  const { data, error } = await supabase
    .from("projects")
    .upsert(databaseProjects, { onConflict: "id" })
    .select("id, title, image");

  if (error) {
    throw new Error(`Database migration failed: ${error.message}`);
  }

  console.log("\nMigration completed successfully!");
  console.log(`Projects migrated: ${data?.length ?? 0}`);

  for (const project of data ?? []) {
    console.log(`- ${project.title}`);
    console.log(`  ID: ${project.id}`);
    console.log(`  Image: ${project.image}`);
  }
}

migrate().catch((error) => {
  console.error("\nMigration failed:", error.message);
  process.exitCode = 1;
});
