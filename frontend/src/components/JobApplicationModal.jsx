import { useState, useEffect } from "react";
import { validateJobApplicationForm } from "../utils/validation";

export default function JobApplicationModal({ open, onClose, jobOpening }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [resume, setResume] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // Reset state when modal opens for a job
  useEffect(() => {
    if (open) {
      setForm({ name: "", email: "", phone: "", message: "" });
      setResume(null);
      setSubmitted(false);
      setLoading(false);
      setError(null);
      setFieldErrors({});
    }
  }, [open, jobOpening?._id]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !jobOpening) return null;

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleResumeChange = (file) => {
    setResume(file);
    if (fieldErrors.resume) {
      setFieldErrors((prev) => ({ ...prev, resume: "" }));
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const valErrors = validateJobApplicationForm(form, resume);
    if (Object.keys(valErrors).length > 0) {
      setFieldErrors(valErrors);
      return;
    }

    setFieldErrors({});
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("jobTitle", jobOpening.title);
    formData.append("message", form.message);
    formData.append("resume", resume);

    try {
      const response = await fetch(`${API_BASE_URL}/job-applications`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit application");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={`Apply for ${jobOpening.title}`}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {!submitted && (
          <div className="modal-header" style={{ marginBottom: "20px", paddingRight: "40px" }}>
            <span className="tag-id" style={{ margin: 0 }}>[{jobOpening.category || "Job"}]</span>
            <h3 style={{ margin: "4px 0", fontSize: "20px" }}>Apply for {jobOpening.title}</h3>
            <p className="sub" style={{ margin: 0, fontSize: "13.5px", color: "var(--text-dim-light)" }}>{jobOpening.location || "Remote"} · {jobOpening.type}</p>
          </div>
        )}

        <div className="modal-body">
          {submitted ? (
            <div className="success-msg">
              <div className="dot-big">✓</div>
              <h3>Application Submitted</h3>
              <p style={{ marginTop: 10, fontSize: 14, color: "var(--text-dim-light)" }}>
                Thanks for applying! We review every application and will follow up within 3–5 business days.
              </p>
              <button
                className="btn-primary"
                style={{ marginTop: 24, width: "100%", justifyContent: "center" }}
                onClick={onClose}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {error && (
                <div style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#ef4444",
                  padding: "10px",
                  borderRadius: "6px",
                  marginBottom: "15px",
                  fontSize: "13px"
                }}>
                  {error}
                </div>
              )}

              <div className="modal-row">
                <div className={`field ${fieldErrors.name ? "has-error" : ""}`}>
                  <label htmlFor="app-name">Full name *</label>
                  <input
                    id="app-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Jane Smith"
                  />
                  {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
                </div>

                <div className={`field ${fieldErrors.email ? "has-error" : ""}`}>
                  <label htmlFor="app-email">Email address *</label>
                  <input
                    id="app-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="jane@company.com"
                  />
                  {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
                </div>
              </div>

              <div className="modal-row">
                <div className={`field ${fieldErrors.phone ? "has-error" : ""}`}>
                  <label htmlFor="app-phone">Phone number</label>
                  <input
                    id="app-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                  {fieldErrors.phone && <span className="field-error">{fieldErrors.phone}</span>}
                </div>

                <div className={`field ${fieldErrors.resume ? "has-error" : ""}`}>
                  <label htmlFor="app-resume">Resume (PDF, DOC, DOCX) *</label>
                  <input
                    id="app-resume"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => handleResumeChange(e.target.files[0])}
                    style={{ padding: "8px 0" }}
                  />
                  {fieldErrors.resume && <span className="field-error">{fieldErrors.resume}</span>}
                </div>
              </div>

              <div className="field">
                <label htmlFor="app-message">Why this role?</label>
                <textarea
                  id="app-message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Briefly explain your interest and fit for this position..."
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading ? "Submitting…" : "Submit Application"}
              </button>

              <p className="form-note">Reply within 3–5 business days</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
