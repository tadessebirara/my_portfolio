import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Upload,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  Image as ImageIcon,
  Pencil,
  Plus,
  RotateCcw,
} from "lucide-react";

import {
  createProject,
  updateProject,
  deleteProject,
  imageUrl,
  verifyAdminKey,
  type Project,
} from "../../lib/api";

const CATEGORIES = [
  "Academic",
  "Web Application",
  "SaaS Platform",
  "Business Website",
  "Mobile App",
  "Other",
];

type Props = {
  onClose: () => void;
  onProjectsChanged: () => void;
  projects: Project[];
};

type ProjectForm = {
  title: string;
  subtitle: string;
  category: string;
  problem: string;
  solution: string;
  tags: string;
  liveUrl: string;
  sourceUrl: string;
  footerLabel: string;
  hasLiveDemo: boolean;
};

const EMPTY: ProjectForm = {
  title: "",
  subtitle: "",
  category: "Web Application",
  problem: "",
  solution: "",
  tags: "",
  liveUrl: "",
  sourceUrl: "",
  footerLabel: "",
  hasLiveDemo: false,
};

export function ProjectManager({
  onClose,
  onProjectsChanged,
  projects,
}: Props) {
  /* ============================================================
     ADMIN AUTHENTICATION
     ============================================================ */

  const [unlocked, setUnlocked] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [checking, setChecking] = useState(false);
  const [gateError, setGateError] = useState("");

  /* ============================================================
     FORM STATE
     ============================================================ */

  const [form, setForm] = useState<ProjectForm>({ ...EMPTY });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [existingImage, setExistingImage] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [busy, setBusy] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  const isEditing = editingId !== null;

  /* ============================================================
     IMAGE PREVIEW
     ============================================================ */

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  /* ============================================================
     ESCAPE KEY
     ============================================================ */

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) {
        onClose();
      }
    };

    document.addEventListener("keydown", onKey);

    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, busy]);

  /* ============================================================
     FORM HELPERS
     ============================================================ */

  const set = <K extends keyof ProjectForm>(key: K, value: ProjectForm[K]) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm({ ...EMPTY });
    setFile(null);
    setExistingImage(null);
    setEditingId(null);
    setError("");
    setSuccess("");

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  /* ============================================================
     ADMIN UNLOCK
     ============================================================ */

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();

    const key = adminKey.trim();

    if (!key) {
      setGateError("Enter the admin key.");
      return;
    }

    setChecking(true);
    setGateError("");

    try {
      const ok = await verifyAdminKey(key);

      if (ok) {
        setUnlocked(true);
      } else {
        setGateError("Incorrect admin key. Try again.");
        setAdminKey("");
      }
    } catch {
      setGateError("Could not reach the server. Make sure it is running.");
    } finally {
      setChecking(false);
    }
  };

  /* ============================================================
     LOAD PROJECT INTO EDIT FORM
     ============================================================ */

  const handleEdit = (project: Project) => {
    setEditingId(project.id);

    setForm({
      title: project.title || "",
      subtitle: project.subtitle || "",
      category: project.category || "Web Application",
      problem: project.problem || "",
      solution: project.solution || "",
      tags: (project.tags || []).join(", "),
      liveUrl: project.liveUrl || "",
      sourceUrl: project.sourceUrl || "",
      footerLabel: project.footerLabel || "",
      hasLiveDemo: Boolean(project.hasLiveDemo),
    });

    setExistingImage(project.image);
    setFile(null);
    setError("");
    setSuccess("");

    if (fileRef.current) {
      fileRef.current.value = "";
    }

    document.getElementById("project-manager-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* ============================================================
     ADD / UPDATE PROJECT
     ============================================================ */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError("Project title is required.");
      return;
    }

    setBusy(true);

    try {
      const fd = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        fd.append(key, String(value));
      });

      // Backend receives tags as a comma-separated string,
      // consistent with the existing create form.
      fd.set("tags", form.tags);

      // Only upload a new image if the user selected one.
      // Otherwise, the backend must preserve the existing image.
      if (file) {
        fd.append("image", file);
      }

      if (editingId) {
        await updateProject(editingId, fd, adminKey);

        setSuccess(`"${form.title}" updated successfully.`);
      } else {
        await createProject(fd, adminKey);

        setSuccess(`"${form.title}" added successfully.`);
      }

      await onProjectsChanged();

      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save project.");
    } finally {
      setBusy(false);
    }
  };

  /* ============================================================
     DELETE PROJECT
     ============================================================ */

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project? This action cannot be undone.",
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");
    setDeletingId(id);

    try {
      await deleteProject(id, adminKey);

      if (editingId === id) {
        resetForm();
      }

      await onProjectsChanged();

      setSuccess("Project deleted successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not delete project.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* ============================================================
     AUTHENTICATION SCREEN
     ============================================================ */

  if (!unlocked) {
    return (
      <Overlay onClose={onClose}>
        <form onSubmit={handleUnlock} className="p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/15">
            <Lock className="h-5 w-5 text-blue-300" />
          </div>

          <h3 className="mt-4 text-center text-lg font-semibold text-white">
            Admin Access
          </h3>

          <p className="mt-1 text-center text-sm text-slate-400">
            Enter your admin key to manage projects.
          </p>

          <div className="mt-6">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Admin Key
            </label>

            <input
              type="password"
              autoFocus
              autoComplete="off"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className={inputCls}
            />
          </div>

          {gateError && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {gateError}
            </div>
          )}

          <button
            type="submit"
            disabled={checking}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
          >
            {checking && <Loader2 className="h-4 w-4 animate-spin" />}
            {checking ? "Checking..." : "Unlock"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="mt-3 w-full rounded-xl py-2 text-sm text-slate-500 transition-colors hover:text-slate-300"
          >
            Cancel
          </button>
        </form>
      </Overlay>
    );
  }

  /* ============================================================
     PROJECT MANAGER
     ============================================================ */

  return (
    <Overlay onClose={onClose}>
      <div className="flex max-h-[85dvh] flex-col">
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-white/[0.07] px-7 py-5">
          <div>
            <h3 className="text-base font-semibold text-white">
              Manage Projects
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Add, edit and manage your portfolio projects.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* SUCCESS MESSAGE */}

        {success && (
          <div className="flex items-center gap-2 border-b border-emerald-400/20 bg-emerald-500/10 px-7 py-3 text-sm text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            {success}
          </div>
        )}

        {/* ERROR MESSAGE */}

        {error && (
          <div className="flex items-center gap-2 border-b border-red-400/20 bg-red-500/10 px-7 py-3 text-sm text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="overflow-y-auto px-7 py-6">
          {/* PROJECT FORM */}

          <form
            id="project-manager-form"
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white">
                {isEditing ? "Edit Project" : "Add New Project"}
              </h4>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Cancel editing
                </button>
              )}
            </div>

            {/* TITLE */}

            <Field label="Project Title">
              <input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                className={inputCls}
                placeholder="Enter project title"
                required
              />
            </Field>

            {/* SUBTITLE */}

            <Field label="Subtitle">
              <input
                value={form.subtitle}
                onChange={(e) => set("subtitle", e.target.value)}
                className={inputCls}
                placeholder="Short project description"
              />
            </Field>

            {/* CATEGORY */}

            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputCls}
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </Field>

            {/* IMAGE */}

            <Field label="Screenshot">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                  {preview || existingImage ? (
                    <img
                      src={preview || imageUrl(existingImage)}
                      alt="Project preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-slate-500" />
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-200 hover:border-white/20"
                  >
                    <Upload className="h-4 w-4" />
                    {file ? "Change image" : "Choose image"}
                  </button>

                  <p className="mt-2 text-xs text-slate-500">
                    {existingImage && !file
                      ? "Current image will be preserved."
                      : "Select a project screenshot."}
                  </p>
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </div>
            </Field>

            {/* PROBLEM */}

            <Field label="The Problem">
              <textarea
                rows={3}
                value={form.problem}
                onChange={(e) => set("problem", e.target.value)}
                className={inputCls}
                placeholder="What problem does this project solve?"
              />
            </Field>

            {/* SOLUTION */}

            <Field label="The Solution">
              <textarea
                rows={3}
                value={form.solution}
                onChange={(e) => set("solution", e.target.value)}
                className={inputCls}
                placeholder="How does your project solve it?"
              />
            </Field>

            {/* TECHNOLOGIES */}

            <Field label="Tech Tags (comma separated)">
              <input
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                className={inputCls}
                placeholder="React, TypeScript, Node.js, PostgreSQL"
              />
            </Field>

            {/* URLS */}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Live URL">
                <input
                  type="url"
                  value={form.liveUrl}
                  onChange={(e) => set("liveUrl", e.target.value)}
                  className={inputCls}
                  placeholder="https://example.com"
                />
              </Field>

              <Field label="Source URL">
                <input
                  type="url"
                  value={form.sourceUrl}
                  onChange={(e) => set("sourceUrl", e.target.value)}
                  className={inputCls}
                  placeholder="https://github.com/..."
                />
              </Field>
            </div>

            {/* FOOTER LABEL AND DEMO */}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Footer Label">
                <input
                  value={form.footerLabel}
                  onChange={(e) => set("footerLabel", e.target.value)}
                  className={inputCls}
                  placeholder="System Architecture"
                />
              </Field>

              <label className="mt-7 flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={form.hasLiveDemo}
                  onChange={(e) => set("hasLiveDemo", e.target.checked)}
                  className="h-4 w-4 accent-blue-500"
                />
                Live demo is available
              </label>
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={busy || deletingId !== null}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isEditing ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}

              {busy
                ? "Saving..."
                : isEditing
                  ? "Update Project"
                  : "Add Project"}
            </button>
          </form>

          {/* EXISTING PROJECTS */}

          <div className="mt-8 border-t border-white/[0.07] pt-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Portfolio Projects ({projects.length})
            </h4>

            <div className="mt-3 space-y-2">
              {projects.length === 0 && (
                <p className="rounded-xl border border-white/[0.07] px-4 py-6 text-center text-sm text-slate-500">
                  No projects have been added yet.
                </p>
              )}

              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
                    editingId === project.id
                      ? "border-blue-500/40 bg-blue-500/[0.06]"
                      : "border-white/[0.07] bg-white/[0.02]"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
                      {project.image && (
                        <img
                          src={imageUrl(project.image)}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm text-white">
                        {project.title}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {project.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    {/* EDIT BUTTON */}

                    <button
                      type="button"
                      onClick={() => handleEdit(project)}
                      disabled={busy || deletingId !== null}
                      aria-label={`Edit ${project.title}`}
                      title="Edit project"
                      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-blue-500/10 hover:text-blue-400 disabled:opacity-50"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    {/* DELETE BUTTON */}

                    <button
                      type="button"
                      onClick={() => handleDelete(project.id)}
                      disabled={busy || deletingId !== null}
                      aria-label={`Delete ${project.title}`}
                      title="Delete project"
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                    >
                      {deletingId === project.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

/* ============================================================
   REUSABLE FIELD
   ============================================================ */

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-sky-400/50";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ============================================================
   MODAL OVERLAY
   ============================================================ */

function Overlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0D1322] shadow-2xl"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default ProjectManager;
