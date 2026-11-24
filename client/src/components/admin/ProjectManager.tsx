import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
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

/* ============================================================
   CONSTANTS
   ============================================================ */

const CATEGORIES = [
  "Academic",
  "Web Application",
  "SaaS Platform",
  "Business Website",
  "Mobile App",
  "Other",
];

/* ============================================================
   TYPES
   ============================================================ */

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

/* ============================================================
   PROJECT MANAGER
   ============================================================ */

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

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  /* ============================================================
     ESCAPE KEY
     ============================================================ */

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy && !checking) {
        onClose();
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose, busy, checking]);

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

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  /* ============================================================
     ADMIN UNLOCK
     ============================================================ */

  const handleUnlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const key = adminKey.trim();

    if (!key) {
      setGateError("Enter the admin key.");
      return;
    }

    setChecking(true);
    setGateError("");

    try {
      const isValid = await verifyAdminKey(key);

      if (isValid) {
        setUnlocked(true);
      } else {
        setGateError("Incorrect admin key. Try again.");
        setAdminKey("");
      }
    } catch (err) {
      setGateError(
        err instanceof Error
          ? err.message
          : "Could not verify admin access. Please try again.",
      );

      setAdminKey("");
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

    setExistingImage(project.image || null);
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError("Project title is required.");
      return;
    }

    setBusy(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("subtitle", form.subtitle);
      formData.append("category", form.category);
      formData.append("problem", form.problem);
      formData.append("solution", form.solution);
      formData.append("tags", form.tags);
      formData.append("liveUrl", form.liveUrl);
      formData.append("sourceUrl", form.sourceUrl);
      formData.append("footerLabel", form.footerLabel);
      formData.append("hasLiveDemo", String(form.hasLiveDemo));

      if (file) {
        formData.append("image", file);
      }

      const projectTitle = form.title.trim();
      const wasEditing = editingId !== null;

      if (editingId) {
        await updateProject(editingId, formData, adminKey);
      } else {
        await createProject(formData, adminKey);
      }

      await onProjectsChanged();

      resetForm();

      setSuccess(
        wasEditing
          ? `"${projectTitle}" updated successfully.`
          : `"${projectTitle}" added successfully.`,
      );
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
            <label
              htmlFor="project-admin-key"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
            >
              Admin Key
            </label>

            <input
              id="project-admin-key"
              type="password"
              autoFocus
              autoComplete="off"
              value={adminKey}
              onChange={(event) => setAdminKey(event.target.value)}
              className={inputCls}
              placeholder="Enter your admin key"
              disabled={checking}
            />
          </div>

          {gateError && (
            <div
              role="alert"
              className="mt-4 flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {gateError}
            </div>
          )}

          <button
            type="submit"
            disabled={checking || !adminKey.trim()}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {checking && <Loader2 className="h-4 w-4 animate-spin" />}
            {checking ? "Checking..." : "Unlock"}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={checking}
            className="mt-3 w-full rounded-xl py-2 text-sm text-slate-500 transition-colors hover:text-slate-300 disabled:opacity-50"
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
            aria-label="Close project manager"
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* SUCCESS MESSAGE */}

        {success && (
          <div
            role="status"
            className="flex items-center gap-2 border-b border-emerald-400/20 bg-emerald-500/10 px-7 py-3 text-sm text-emerald-300"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            {success}
          </div>
        )}

        {/* ERROR MESSAGE */}

        {error && (
          <div
            role="alert"
            className="flex items-center gap-2 border-b border-red-400/20 bg-red-500/10 px-7 py-3 text-sm text-red-300"
          >
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
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-white disabled:opacity-50"
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
                onChange={(event) => set("title", event.target.value)}
                className={inputCls}
                placeholder="Enter project title"
                required
                disabled={busy}
              />
            </Field>

            {/* SUBTITLE */}

            <Field label="Subtitle">
              <input
                value={form.subtitle}
                onChange={(event) => set("subtitle", event.target.value)}
                className={inputCls}
                placeholder="Short project description"
                disabled={busy}
              />
            </Field>

            {/* CATEGORY */}

            <Field label="Category">
              <select
                value={form.category}
                onChange={(event) => set("category", event.target.value)}
                className={inputCls}
                disabled={busy}
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </Field>

            {/* IMAGE */}

            <Field label="Project Screenshot">
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
                    disabled={busy}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-200 transition-colors hover:border-white/20 disabled:opacity-50"
                  >
                    <Upload className="h-4 w-4" />
                    {file ? "Change image" : "Choose image"}
                  </button>

                  <p className="mt-2 text-xs text-slate-500">
                    {existingImage && !file
                      ? "Current image will be preserved."
                      : "Select a project screenshot."}
                  </p>

                  {file && (
                    <p className="mt-1 max-w-xs truncate text-xs text-blue-300">
                      {file.name}
                    </p>
                  )}
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                  hidden
                  disabled={busy}
                  onChange={(event) => {
                    const selectedFile = event.target.files?.[0] ?? null;

                    if (!selectedFile) return;

                    if (selectedFile.size > 8 * 1024 * 1024) {
                      setError("Image must be smaller than 8 MB.");

                      event.target.value = "";
                      return;
                    }

                    setError("");
                    setFile(selectedFile);
                  }}
                />
              </div>
            </Field>

            {/* PROBLEM */}

            <Field label="The Problem">
              <textarea
                rows={3}
                value={form.problem}
                onChange={(event) => set("problem", event.target.value)}
                className={inputCls}
                placeholder="What problem does this project solve?"
                disabled={busy}
              />
            </Field>

            {/* SOLUTION */}

            <Field label="The Solution">
              <textarea
                rows={3}
                value={form.solution}
                onChange={(event) => set("solution", event.target.value)}
                className={inputCls}
                placeholder="How does your project solve it?"
                disabled={busy}
              />
            </Field>

            {/* TECHNOLOGIES */}

            <Field label="Technologies (comma separated)">
              <input
                value={form.tags}
                onChange={(event) => set("tags", event.target.value)}
                className={inputCls}
                placeholder="React, TypeScript, Node.js, PostgreSQL"
                disabled={busy}
              />
            </Field>

            {/* URLS */}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Live URL">
                <input
                  type="url"
                  value={form.liveUrl}
                  onChange={(event) => set("liveUrl", event.target.value)}
                  className={inputCls}
                  placeholder="https://example.com"
                  disabled={busy}
                />
              </Field>

              <Field label="Source URL">
                <input
                  type="url"
                  value={form.sourceUrl}
                  onChange={(event) => set("sourceUrl", event.target.value)}
                  className={inputCls}
                  placeholder="https://github.com/..."
                  disabled={busy}
                />
              </Field>
            </div>

            {/* FOOTER LABEL AND DEMO */}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Footer Label">
                <input
                  value={form.footerLabel}
                  onChange={(event) => set("footerLabel", event.target.value)}
                  className={inputCls}
                  placeholder="System Architecture"
                  disabled={busy}
                />
              </Field>

              <label className="mt-7 flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={form.hasLiveDemo}
                  onChange={(event) => set("hasLiveDemo", event.target.checked)}
                  disabled={busy}
                  className="h-4 w-4 accent-blue-500"
                />
                Live demo is available
              </label>
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={busy || deletingId !== null}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
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
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-sky-400/50 disabled:cursor-not-allowed disabled:opacity-50";

function Field({ label, children }: { label: string; children: ReactNode }) {
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
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8">
      <button
        type="button"
        aria-label="Close modal backdrop"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
      />

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
