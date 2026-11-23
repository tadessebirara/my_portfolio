import fs from "fs";
import path from "path";

// Render: /var/data
// Local development: server directory
export const STORAGE_DIR = process.env.STORAGE_DIR || process.cwd();

export const DATA_DIR = path.join(STORAGE_DIR, "data");
export const UPLOAD_DIR = path.join(STORAGE_DIR, "uploads");

export const DATA_FILE = path.join(DATA_DIR, "projects.json");

// Create directories if they don't exist.
fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
