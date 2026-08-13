import { useState, useEffect } from "react";
import "./Careers.css";

export default function Careers() {
  const [activeTab, setActiveTab] = useState("applications"); // "applications" or "roles"

  // State for Applications
  const [applications, setApplications] = useState([]);
  const [appsLoading, setAppsLoading] = useState(true);
  const [appsError, setAppsError] = useState(null);

  // State for Open Roles
  const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [rolesError, setRolesError] = useState(null);

  // State for Add Role Form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRole, setNewRole] = useState({
    title: "",
    type: "Job",
    category: "IT",
    location: "",
    description: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const BACKEND_URL = "http://localhost:5000";
  const token = localStorage.getItem("adminToken");

  // Fetch applications
  const fetchApplications = async () => {
    setAppsLoading(true);
    setAppsError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/job-applications?limit=100`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to retrieve job applications");
      }
      const data = await response.json();
      setApplications(data.data || []);
    } catch (err) {
      setAppsError(err.message || "Failed to load applications");
    } finally {
      setAppsLoading(false);
    }
  };

  // Fetch open roles
  const fetchRoles = async () => {
    setRolesLoading(true);
    setRolesError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/job-openings?limit=100`);
      if (!response.ok) {
        throw new Error("Failed to retrieve job openings");
      }
      const data = await response.json();
      setRoles(data.data || []);
    } catch (err) {
      setRolesError(err.message || "Failed to load roles");
    } finally {
      setRolesLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchRoles();
  }, [API_BASE_URL, token]);

  const handleViewResume = (resumeUrl) => {
    if (!resumeUrl) return;
    if (resumeUrl.startsWith("http://") || resumeUrl.startsWith("https://")) {
      window.open(resumeUrl, "_blank");
    } else {
      const cleanPath = resumeUrl.replace(/\\/g, "/");
      window.open(`${BACKEND_URL}/${cleanPath}`, "_blank");
    }
  };

  const handleDeleteRole = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job role?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/job-openings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete job role");
      }

      // Update state
      setRoles((prev) => prev.filter((role) => role._id !== id));
    } catch (err) {
      alert(err.message || "Error deleting role");
    }
  };

  const handleCreateRoleSubmit = async (e) => {
    e.preventDefault();
    if (!newRole.title || !newRole.description) {
      alert("Title and description are required.");
      return;
    }
    setFormSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/job-openings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRole),
      });

      if (!response.ok) {
        throw new Error("Failed to create job role");
      }

      await fetchRoles();
      setShowAddForm(false);
      setNewRole({
        title: "",
        type: "Job",
        category: "IT",
        location: "",
        description: "",
      });
    } catch (err) {
      alert(err.message || "Error creating job role");
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="admin-careers-page">
      <div className="careers-tabs">
        <button
          className={`tab-btn ${activeTab === "applications" ? "active" : ""}`}
          onClick={() => setActiveTab("applications")}
        >
          Job Applications ({applications.length})
        </button>
        <button
          className={`tab-btn ${activeTab === "roles" ? "active" : ""}`}
          onClick={() => setActiveTab("roles")}
        >
          Open Roles ({roles.length})
        </button>
      </div>

      {activeTab === "applications" ? (
        <div className="page-card">
          {appsLoading ? (
            <div className="status-message">Loading applications...</div>
          ) : appsError ? (
            <div className="error-message">{appsError}</div>
          ) : applications.length === 0 ? (
            <div className="status-message">No job applications found.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Applicant</th>
                  <th>Email</th>
                  <th>Position</th>
                  <th>Resume</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app, i) => (
                  <tr key={app._id}>
                    <td>{i + 1}</td>
                    <td>{app.name}</td>
                    <td>{app.email}</td>
                    <td>{app.jobTitle}</td>
                    <td>
                      <button
                        className="resume-btn"
                        onClick={() => handleViewResume(app.resumeUrl)}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <select
                        className="status-dropdown"
                        value={app.status || "Pending"}
                        onChange={(e) => {
                          setApplications((prev) =>
                            prev.map((a) => (a._id === app._id ? { ...a, status: e.target.value } : a))
                          );
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="roles-section">
          <div className="roles-header">
            <button
              className="add-role-btn"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? "Cancel" : "+ Add Open Role"}
            </button>
          </div>

          {showAddForm && (
            <div className="admin-add-role-form-card">
              <h3>Create New Job Role</h3>
              <form onSubmit={handleCreateRoleSubmit}>
                <div className="admin-form-group">
                  <label>Job Title *</label>
                  <input
                    type="text"
                    required
                    value={newRole.title}
                    onChange={(e) => setNewRole({ ...newRole, title: e.target.value })}
                    placeholder="e.g. Full Stack Developer Intern"
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Job Type *</label>
                    <select
                      value={newRole.type}
                      onChange={(e) => setNewRole({ ...newRole, type: e.target.value })}
                    >
                      <option value="Job">Job</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>Category *</label>
                    <select
                      value={newRole.category}
                      onChange={(e) => setNewRole({ ...newRole, category: e.target.value })}
                    >
                      <option value="IT">IT</option>
                      <option value="Non IT">Non IT</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={newRole.location}
                    onChange={(e) => setNewRole({ ...newRole, location: e.target.value })}
                    placeholder="e.g. Remote / Bangalore"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Job Description *</label>
                  <textarea
                    required
                    rows="6"
                    value={newRole.description}
                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                    placeholder="Provide full description, requirements, and tech stack..."
                  ></textarea>
                </div>

                <button type="submit" className="admin-submit-btn" disabled={formSubmitting}>
                  {formSubmitting ? "Saving..." : "Create Role"}
                </button>
              </form>
            </div>
          )}

          <div className="page-card">
            {rolesLoading ? (
              <div className="status-message">Loading roles...</div>
            ) : rolesError ? (
              <div className="error-message">{rolesError}</div>
            ) : roles.length === 0 ? (
              <div className="status-message">No open roles found.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {roles.map((role, i) => (
                    <tr key={role._id}>
                      <td>{i + 1}</td>
                      <td><strong>{role.title}</strong></td>
                      <td>{role.type}</td>
                      <td>{role.category}</td>
                      <td>{role.location || "N/A"}</td>
                      <td>
                        <button
                          className="delete-role-btn"
                          onClick={() => handleDeleteRole(role._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}