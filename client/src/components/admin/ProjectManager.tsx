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
} from "lucide-react";
import {
  createProject,
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

const EMPTY = {
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

export function ProjectManager({ onClose, onProjectsChanged, projects }: Props) {
  /* ── password gate state ──────────────────────────
     starts locked every single time.
     no localStorage. no session. no cookies. */
  const [unlocked, setUnlocked] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [checking, setChecking] = useState(false);
  const [gateError, setGateError] = useState("");

  /* ── form state ─────────────────────────────────── */
  const [form, setForm] = useState({ ...EMPTY });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  /* image preview */
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  /* escape key closes the modal */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (k: string, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  /* ── unlock handler ─────────────────────────────── */
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

  /* ── save project ───────────────────────────────── */
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
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      if (file) fd.append("image", file);

      await createProject(fd, adminKey);
      onProjectsChanged();

      setSuccess(`"${form.title}" is attached successfully.`);
      setForm({ ...EMPTY });
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not attach project.");
    } finally {
      setBusy(false);
    }
  };

  /* ── delete project ─────────────────────────────── */
  const handleDelete = async (id: string) => {
    setError("");
    setSuccess("");
    try {
      await deleteProject(id, adminKey);
      onProjectsChanged();
      setSuccess("Project removed.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete project.");
    }
  };

  /* ============================================================
     GATE — shown whenever the modal opens
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
     MANAGER — shown after unlocking
     ============================================================ */
  return (
    <Overlay onClose={onClose}>
      <div className="flex max-h-[85dvh] flex-col">
        {/* header */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-7 py-5">
          <h3 className="text-base font-semibold text-white">
            Manage Projects
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* banners */}
        {success && (
          <div className="flex items-center gap-2 border-b border-emerald-400/20 bg-emerald-500/10 px-7 py-3 text-sm text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0" /> {success}
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 border-b border-red-400/20 bg-red-500/10 px-7 py-3 text-sm text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        <div className="overflow-y-auto px-7 py-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Project Title">
              <input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Subtitle">
              <input
                value={form.subtitle}
                onChange={(e) => set("subtitle", e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputCls}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Screenshot">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-slate-500" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-200 hover:border-white/20"
                >
                  <Upload className="h-4 w-4" />
                  {file ? "Change image" : "Choose image"}
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </div>
            </Field>

            <Field label="The Problem">
              <textarea
                rows={3}
                value={form.problem}
                onChange={(e) => set("problem", e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="The Solution">
              <textarea
                rows={3}
                value={form.solution}
                onChange={(e) => set("solution", e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Tech Tags (comma separated)">
              <input
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                className={inputCls}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Live URL">
                <input
                  value={form.liveUrl}
                  onChange={(e) => set("liveUrl", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Source URL">
                <input
                  value={form.sourceUrl}
                  onChange={(e) => set("sourceUrl", e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Footer Label">
                <input
                  value={form.footerLabel}
                  onChange={(e) => set("footerLabel", e.target.value)}
                  className={inputCls}
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

            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {busy ? "Attaching..." : "Attach Project"}
            </button>
          </form>

          {/* existing projects */}
          <div className="mt-8 border-t border-white/[0.07] pt-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Attached projects ({projects.length})
            </h4>
            <div className="mt-3 space-y-2">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
                      {p.image && (
                        <img
                          src={imageUrl(p.image)}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="truncate">
                      <p className="truncate text-sm text-white">{p.title}</p>
                      <p className="truncate text-xs text-slate-500">
                        {p.category}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(p.id)}
                    aria-label={`Delete ${p.title}`}
                    className="rounded-lg p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

/* ---------- helpers ---------- */
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