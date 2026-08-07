import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function Careers() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("openings"); // 'openings' | 'applications'

  // Job Openings State
  const [openings, setOpenings] = useState([]);
  const [openingsPagination, setOpeningsPagination] = useState({ currentPage: 1, totalPages: 1, totalDocuments: 0 });
  const [openingsSearch, setOpeningsSearch] = useState("");
  const [openingsLoading, setOpeningsLoading] = useState(true);
  const [openingsError, setOpeningsError] = useState(null);

  // Modal / Form state for Job Openings (Create / Edit)
  const [showModal, setShowModal] = useState(false);
  const [editingOpening, setEditingOpening] = useState(null); // null for create, object for edit
  const [formData, setFormData] = useState({ title: "", type: "Job", category: "IT", location: "", description: "" });
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Job Applications State
  const [applications, setApplications] = useState([]);
  const [appsPagination, setAppsPagination] = useState({ currentPage: 1, totalPages: 1, totalDocuments: 0 });
  const [appsSearch, setAppsSearch] = useState("");
  const [appsLoading, setAppsLoading] = useState(true);
  const [appsError, setAppsError] = useState(null);

  const [actionLoadingId, setActionLoadingId] = useState(null);

  const API_BASE_URL = "http://localhost:5000";

  // Fetch Job Openings
  const fetchOpenings = useCallback(
    async (page = 1) => {
      setOpeningsLoading(true);
      setOpeningsError(null);
      const token = localStorage.getItem("token");

      if (!token) return navigate("/login");

      try {
        const queryParams = new URLSearchParams({ page, limit: 10, search: openingsSearch });
        const response = await fetch(`${API_BASE_URL}/api/job-openings?${queryParams}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          return navigate("/login");
        }

        if (!response.ok) throw new Error(`Failed to load job openings (Status: ${response.status})`);

        const resData = await response.json();
        setOpenings(resData.data || []);
        setOpeningsPagination(resData.pagination || { currentPage: 1, totalPages: 1, totalDocuments: 0 });
      } catch (err) {
        setOpeningsError(err.message || "Error loading job openings");
      } finally {
        setOpeningsLoading(false);
      }
    },
    [navigate, openingsSearch]
  );

  // Fetch Job Applications
  const fetchApplications = useCallback(
    async (page = 1) => {
      setAppsLoading(true);
      setAppsError(null);
      const token = localStorage.getItem("token");

      if (!token) return navigate("/login");

      try {
        const queryParams = new URLSearchParams({ page, limit: 10, search: appsSearch });
        const response = await fetch(`${API_BASE_URL}/api/job-applications?${queryParams}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          return navigate("/login");
        }

        if (!response.ok) throw new Error(`Failed to load job applications (Status: ${response.status})`);

        const resData = await response.json();
        setApplications(resData.data || []);
        setAppsPagination(resData.pagination || { currentPage: 1, totalPages: 1, totalDocuments: 0 });
      } catch (err) {
        setAppsError(err.message || "Error loading job applications");
      } finally {
        setAppsLoading(false);
      }
    },
    [navigate, appsSearch]
  );

  useEffect(() => {
    if (activeTab === "openings") fetchOpenings(1);
    else fetchApplications(1);
  }, [activeTab, fetchOpenings, fetchApplications]);

  // Open Modal for Create
  const handleOpenCreateModal = () => {
    setEditingOpening(null);
    setFormData({ title: "", type: "Job", category: "IT", location: "", description: "" });
    setShowModal(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (opening) => {
    setEditingOpening(opening);
    setFormData({
      title: opening.title,
      type: opening.type || "Job",
      category: opening.category || "IT",
      location: opening.location || "",
      description: opening.description,
    });
    setShowModal(true);
  };

  // Submit Form (Create or Edit)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    setFormSubmitting(true);
    try {
      const url = editingOpening
        ? `${API_BASE_URL}/api/job-openings/${editingOpening._id}`
        : `${API_BASE_URL}/api/job-openings`;
      const method = editingOpening ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        return navigate("/login");
      }

      if (!response.ok) throw new Error("Failed to save job opening");

      setShowModal(false);
      fetchOpenings(openingsPagination.currentPage);
    } catch (err) {
      alert(err.message || "Failed to save job opening");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Delete Job Opening
  const handleDeleteOpening = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job opening?")) return;

    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    setActionLoadingId(id);
    try {
      const response = await fetch(`${API_BASE_URL}/api/job-openings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        return navigate("/login");
      }

      if (!response.ok) throw new Error("Failed to delete job opening");

      setOpenings((prev) => prev.filter((item) => item._id !== id));
      setOpeningsPagination((prev) => ({ ...prev, totalDocuments: Math.max(0, prev.totalDocuments - 1) }));
    } catch (err) {
      alert(err.message || "Failed to delete job opening");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Delete Job Application
  const handleDeleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job application?")) return;

    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    setActionLoadingId(id);
    try {
      const response = await fetch(`${API_BASE_URL}/api/job-applications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        return navigate("/login");
      }

      if (!response.ok) throw new Error("Failed to delete job application");

      setApplications((prev) => prev.filter((item) => item._id !== id));
      setAppsPagination((prev) => ({ ...prev, totalDocuments: Math.max(0, prev.totalDocuments - 1) }));
    } catch (err) {
      alert(err.message || "Failed to delete job application");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h1 style={{ color: "#ffffff", marginBottom: "20px", fontSize: "28px" }}>Careers Management</h1>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "25px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <button
          onClick={() => setActiveTab("openings")}
          style={{
            padding: "10px 20px",
            background: "none",
            border: "none",
            borderBottom: activeTab === "openings" ? "3px solid #3b82f6" : "3px solid transparent",
            color: activeTab === "openings" ? "#3b82f6" : "#9ca3af",
            fontWeight: "600",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Job Openings ({openingsPagination.totalDocuments})
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          style={{
            padding: "10px 20px",
            background: "none",
            border: "none",
            borderBottom: activeTab === "applications" ? "3px solid #3b82f6" : "3px solid transparent",
            color: activeTab === "applications" ? "#3b82f6" : "#9ca3af",
            fontWeight: "600",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Job Applications ({appsPagination.totalDocuments})
        </button>
      </div>

      {/* TAB 1: JOB OPENINGS */}
      {activeTab === "openings" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "15px" }}>
            <input
              type="text"
              placeholder="Search job openings..."
              value={openingsSearch}
              onChange={(e) => setOpeningsSearch(e.target.value)}
              style={{
                padding: "10px 14px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "14px",
                outline: "none",
                minWidth: "260px",
              }}
            />
            <button
              onClick={handleOpenCreateModal}
              style={{
                padding: "10px 18px",
                background: "#3b82f6",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              + Add New Opening
            </button>
          </div>

          {openingsLoading ? (
            <div style={{ color: "#9ca3af", padding: "40px 0", fontSize: "16px" }}>Loading job openings...</div>
          ) : openingsError ? (
            <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "10px", padding: "20px", color: "#ef4444" }}>
              <p style={{ margin: "0 0 15px 0" }}>{openingsError}</p>
              <button onClick={() => fetchOpenings(openingsPagination.currentPage)} style={{ padding: "8px 16px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Retry</button>
            </div>
          ) : openings.length === 0 ? (
            <div style={{ background: "rgba(255, 255, 255, 0.03)", borderRadius: "12px", padding: "40px", textAlign: "center", color: "#9ca3af", border: "1px dashed rgba(255, 255, 255, 0.1)" }}>No job openings found.</div>
          ) : (
            <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: "rgba(255, 255, 255, 0.03)", color: "#ffffff", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ background: "rgba(255, 255, 255, 0.08)", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    <th style={{ padding: "14px 16px" }}>Title</th>
                    <th style={{ padding: "14px 16px" }}>Type</th>
                    <th style={{ padding: "14px 16px" }}>Category</th>
                    <th style={{ padding: "14px 16px" }}>Location</th>
                    <th style={{ padding: "14px 16px" }}>Description</th>
                    <th style={{ padding: "14px 16px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {openings.map((job) => (
                    <tr key={job._id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                      <td style={{ padding: "14px 16px", fontWeight: "600" }}>{job.title}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", background: job.type === "Job" ? "rgba(59, 130, 246, 0.15)" : "rgba(236, 72, 153, 0.15)", color: job.type === "Job" ? "#60a5fa" : "#f472b6" }}>
                          {job.type}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", background: (job.category || "IT") === "IT" ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)", color: (job.category || "IT") === "IT" ? "#34d399" : "#fbbf24" }}>
                          {job.category || "IT"}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px", color: "#d1d5db" }}>{job.location || "Remote"}</td>
                      <td style={{ padding: "14px 16px", color: "#9ca3af", maxWidth: "300px", wordBreak: "break-word" }}>{job.description}</td>
                      <td style={{ padding: "14px 16px", textAlign: "right" }}>
                        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                          <button onClick={() => handleOpenEditModal(job)} style={{ padding: "6px 12px", background: "#f59e0b", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}>Edit</button>
                          <button onClick={() => handleDeleteOpening(job._id)} disabled={actionLoadingId === job._id} style={{ padding: "6px 12px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: JOB APPLICATIONS */}
      {activeTab === "applications" && (
        <div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search applications by name, email, job title..."
              value={appsSearch}
              onChange={(e) => setAppsSearch(e.target.value)}
              style={{
                padding: "10px 14px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "14px",
                outline: "none",
                maxWidth: "400px",
                width: "100%",
              }}
            />
          </div>

          {appsLoading ? (
            <div style={{ color: "#9ca3af", padding: "40px 0", fontSize: "16px" }}>Loading job applications...</div>
          ) : appsError ? (
            <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "10px", padding: "20px", color: "#ef4444" }}>
              <p style={{ margin: "0 0 15px 0" }}>{appsError}</p>
              <button onClick={() => fetchApplications(appsPagination.currentPage)} style={{ padding: "8px 16px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Retry</button>
            </div>
          ) : applications.length === 0 ? (
            <div style={{ background: "rgba(255, 255, 255, 0.03)", borderRadius: "12px", padding: "40px", textAlign: "center", color: "#9ca3af", border: "1px dashed rgba(255, 255, 255, 0.1)" }}>No job applications found.</div>
          ) : (
            <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: "rgba(255, 255, 255, 0.03)", color: "#ffffff", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ background: "rgba(255, 255, 255, 0.08)", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    <th style={{ padding: "14px 16px" }}>Applicant</th>
                    <th style={{ padding: "14px 16px" }}>Position</th>
                    <th style={{ padding: "14px 16px" }}>Resume</th>
                    <th style={{ padding: "14px 16px" }}>Message</th>
                    <th style={{ padding: "14px 16px" }}>Applied Date</th>
                    <th style={{ padding: "14px 16px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app._id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                      <td style={{ padding: "14px 16px", fontWeight: "600" }}>
                        <div>{app.name}</div>
                        <div style={{ fontSize: "12px", color: "#9ca3af" }}>{app.email} {app.phone && `• ${app.phone}`}</div>
                      </td>
                      <td style={{ padding: "14px 16px", color: "#60a5fa", fontWeight: "500" }}>{app.jobTitle}</td>
                      <td style={{ padding: "14px 16px" }}>
                        {app.resumeUrl ? (
                          <a
                            href={`${API_BASE_URL}${app.resumeUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              padding: "6px 12px",
                              background: "rgba(16, 185, 129, 0.15)",
                              color: "#34d399",
                              borderRadius: "6px",
                              textDecoration: "none",
                              fontSize: "12px",
                              fontWeight: "600",
                              display: "inline-block",
                            }}
                          >
                            📄 View Resume
                          </a>
                        ) : (
                          <span style={{ color: "#6b7280" }}>No resume</span>
                        )}
                      </td>
                      <td style={{ padding: "14px 16px", color: "#d1d5db", maxWidth: "250px", wordBreak: "break-word" }}>{app.message || "—"}</td>
                      <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "13px" }}>{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: "14px 16px", textAlign: "right" }}>
                        <button onClick={() => handleDeleteApplication(app._id)} disabled={actionLoadingId === app._id} style={{ padding: "6px 12px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* CREATE / EDIT MODAL FOR JOB OPENINGS */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#0f172a",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "14px",
              padding: "25px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}
          >
            <h2 style={{ color: "#ffffff", marginTop: 0, marginBottom: "20px", fontSize: "20px" }}>
              {editingOpening ? "Edit Job Opening" : "Create New Job Opening"}
            </h2>

            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", color: "#9ca3af", marginBottom: "5px", fontSize: "14px" }}>Job Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", color: "#fff", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                <div>
                  <label style={{ display: "block", color: "#9ca3af", marginBottom: "5px", fontSize: "14px" }}>Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    style={{ width: "100%", padding: "10px", background: "#1e293b", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", color: "#fff", outline: "none", boxSizing: "border-box" }}
                  >
                    <option value="Job">Job</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", color: "#9ca3af", marginBottom: "5px", fontSize: "14px" }}>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: "100%", padding: "10px", background: "#1e293b", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", color: "#fff", outline: "none", boxSizing: "border-box" }}
                  >
                    <option value="IT">IT</option>
                    <option value="Non IT">Non IT</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", color: "#9ca3af", marginBottom: "5px", fontSize: "14px" }}>Location</label>
                <input
                  type="text"
                  placeholder="e.g. Remote / Bangalore"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", color: "#fff", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", color: "#9ca3af", marginBottom: "5px", fontSize: "14px" }}>Description</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", color: "#fff", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: "8px 16px", background: "rgba(255,255,255,0.1)", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  style={{ padding: "8px 16px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}
                >
                  {formSubmitting ? "Saving..." : "Save Position"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}