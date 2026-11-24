const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const SERVER_URL = API_URL.endsWith("/api") ? API_URL.slice(0, -4) : API_URL;

// ============================================================
// CONTACT TYPES
// ============================================================

export interface ContactPayload {
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  message: string;
  agreement: boolean;
  website?: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// ============================================================
// PROJECT TYPES
// ============================================================

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

// ============================================================
// SHARED API ERROR HANDLING
// ============================================================

async function getErrorMessage(
  response: Response,
  fallback: string,
): Promise<string> {
  const data = await response.json().catch(() => null);

  return data?.error || data?.message || fallback;
}

// ============================================================
// IMAGE URL
// ============================================================

export function imageUrl(path: string | null | undefined): string {
  if (!path) return "";

  // Already a complete URL
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const clean = path.replace(/^\/+/, "").replace(/^uploads\//, "");

  return `${SERVER_URL}/uploads/${clean}`;
}

// ============================================================
// GET ALL PROJECTS
// ============================================================

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects`);

  if (!res.ok) {
    throw new Error(await getErrorMessage(res, "Could not load projects."));
  }

  return res.json();
}

// ============================================================
// VERIFY ADMIN KEY
// ============================================================


export async function verifyAdminKey(adminKey: string): Promise<boolean> {
  const res = await fetch(`${API_URL}/projects/admin/verify`, {
    method: "POST",
    headers: {
      "x-admin-key": adminKey,
    },
  });

  let data: { error?: string; message?: string } = {};

  try {
    data = await res.json();
  } catch {
    // Response was not valid JSON.
  }

  if (!res.ok) {
    throw new Error(
      data.error || data.message || `Verification failed (${res.status}).`,
    );
  }

  return true;
}


// ============================================================
// CREATE PROJECT
// ============================================================

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
    throw new Error(await getErrorMessage(res, "Could not create project."));
  }

  return res.json();
}

// ============================================================
// UPDATE PROJECT
// ============================================================

export async function updateProject(
  id: string,
  form: FormData,
  adminKey: string,
): Promise<Project> {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      "x-admin-key": adminKey,
    },
    body: form,
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res, "Could not update project."));
  }

  return res.json();
}

// ============================================================
// DELETE PROJECT
// ============================================================

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
    throw new Error(await getErrorMessage(res, "Could not delete project."));
  }
}

// ============================================================
// SUBMIT CONTACT FORM
// ============================================================

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
    throw new Error(
      response?.error ||
        response?.message ||
        "Message could not be sent. Please try again.",
    );
  }

  if (!response?.success) {
    throw new Error(
      response?.message || "The server could not confirm your message.",
    );
  }

  return response as ContactResponse;
}
