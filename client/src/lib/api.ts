 
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const SERVER_URL = API_URL.endsWith("/api") ? API_URL.slice(0, -4) : API_URL;

// Contact form payload shared with Contact.tsx
export interface ContactPayload {
  name: string;
  email: string;
  projectType: string;
  message: string;
  agreement: boolean;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Project interface
export interface Project {
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
  createdAt?: string;
}

// Convert uploaded image paths into accessible URLs
export function imageUrl(path: string | null | undefined): string {
  if (!path) return "";

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const clean = path.replace(/^\/+/, "").replace(/^uploads\//, "");

  return `${SERVER_URL}/uploads/${clean}`;
}

// Get all portfolio projects
export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects`);

  if (!res.ok) {
    throw new Error("Could not load projects");
  }

  return res.json();
}

// Verify admin key
export async function verifyAdminKey(adminKey: string): Promise<boolean> {
  const res = await fetch(`${API_URL}/projects/admin/verify`, {
    method: "POST",
    headers: {
      "x-admin-key": adminKey,
    },
  });

  return res.ok;
}

// Create a new project
export async function createProject(
  form: FormData,
  adminKey: string,
): Promise<Project> {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "x-admin-key": adminKey,
    },
    body: form,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);

    throw new Error(data?.error || "Could not attach project");
  }

  return res.json();
}

// Delete a project
export async function deleteProject(
  id: string,
  adminKey: string,
): Promise<void> {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: {
      "x-admin-key": adminKey,
    },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);

    throw new Error(data?.error || "Could not delete project");
  }
}

// Submit contact form
export async function submitContactForm(
  data: ContactPayload,
): Promise<ContactResponse> {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(response?.error || "Message could not be sent");
  }

  return response as ContactResponse;
}
