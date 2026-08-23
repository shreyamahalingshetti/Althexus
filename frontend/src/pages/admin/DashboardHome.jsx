import { useState, useEffect } from "react";
import "./DashboardHome.css";

export default function DashboardHome({ setActivePage }) {
  const [stats, setStats] = useState({
    totalServiceRequests: 0,
    totalJobOpenings: 0,
    totalJobApplications: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const BACKEND_URL = "http://localhost:5000";
  const token = localStorage.getItem("adminToken");

  const handleViewResume = (resumeUrl) => {
    if (!resumeUrl) return;
    if (resumeUrl.startsWith("http://") || resumeUrl.startsWith("https://")) {
      window.open(resumeUrl, "_blank");
    } else {
      const cleanPath = resumeUrl.replace(/\\/g, "/");
      window.open(`${BACKEND_URL}/${cleanPath}`, "_blank");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch dashboard stats
        const statsRes = await fetch(`${API_BASE_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!statsRes.ok) {
          throw new Error("Failed to load dashboard statistics");
        }
        const statsData = await statsRes.json();
        setStats(statsData);

        // Fetch recent service requests and job applications
        const [requestsRes, applicationsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/service-requests?limit=100`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${API_BASE_URL}/job-applications?limit=100`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (!requestsRes.ok || !applicationsRes.ok) {
          throw new Error("Failed to load recent activity");
        }

        const requestsData = await requestsRes.json();
        const applicationsData = await applicationsRes.json();
        
        // Filter requests and applications created today
        const isToday = (dateString) => {
          const date = new Date(dateString);
          const today = new Date();
          return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          );
        };
        const todayRequests = (requestsData.data || [])
          .filter((req) => isToday(req.createdAt))
          .map((req) => ({ ...req, activityType: "service-request" }));

        const todayApplications = (applicationsData.data || [])
          .filter((app) => isToday(app.createdAt))
          .map((app) => ({ ...app, activityType: "job-application" }));

        // Combine and sort by createdAt descending
        const combined = [...todayRequests, ...todayApplications].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setRecentActivity(combined);
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_BASE_URL, token]);

  const cards = [
    { icon: "📋", label: "Service Requests", value: stats.totalServiceRequests, color: "blue" },
    { icon: "💼", label: "Careers", value: stats.totalJobApplications, color: "amber" },
  ];

  const quickActions = [
    { icon: "📋", label: "Service Requests", page: "services" },
    { icon: "💼", label: "Careers", page: "careers" },
    { icon: "⚙️", label: "Settings", page: "settings" },
  ];

  return (
    <div className="dashboard-home">

      <div className="dashboard-cards">
        {cards.map((c) => (
          <div className="kpi-card" key={c.label}>
            <div className={`kpi-icon kpi-${c.color}`}>{c.icon}</div>
            <div className="kpi-value">{c.value}</div>
            <div className="kpi-label">{c.label}</div>
            <div className={`kpi-bar kpi-bar-${c.color}`} />
          </div>
        ))}
      </div>

      <div className="quick-actions">
        <h2>⚡ Quick Actions</h2>

        <div className="quick-actions-grid">
          {quickActions.map((a) => (
            <button
              key={a.page}
              className="quick-action-tile"
              onClick={() => setActivePage && setActivePage(a.page)}
            >
              <span className="quick-action-icon">{a.icon}</span>
              <span>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="recent-section">
        <h2>Recent Activity</h2>

        {loading ? (
          <div style={{ color: "var(--text-dim-light)", padding: "20px 0" }}>Loading activity...</div>
        ) : error ? (
          <div style={{ color: "#ef4444", padding: "20px 0" }}>{error}</div>
        ) : recentActivity.length === 0 ? (
          <div style={{ color: "var(--text-dim-light)", padding: "20px 0" }}>No recent activity.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Request</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {recentActivity.map((act) => (
                <tr key={act._id}>
                  <td>{act.name}</td>
                  <td>
                    {act.activityType === "job-application"
                      ? `Job Application: ${act.jobTitle}`
                      : act.serviceRequired}
                  </td>
                  <td>
                    {act.activityType === "job-application" ? (
                      <span className="status-pill status-pending">
                        {act.status || "Pending"}
                      </span>
                    ) : (
                      <span className={`status-pill status-${act.status === "Completed" ? "completed" : "pending"}`}>
                        {act.status}
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      className="resume-btn"
                      style={{ padding: "5px 10px", fontSize: "12px" }}
                      onClick={() => setSelectedRequest(act)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for viewing complete request/application details */}
      {selectedRequest && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSelectedRequest(null); }}>
          <div className="modal" style={{ maxWidth: "600px" }}>
            <button className="modal-close" onClick={() => setSelectedRequest(null)}>✕</button>
            
            <span className="tag-id">
              {selectedRequest.activityType === 'job-application' ? 'Application ID' : 'Request ID'}: {selectedRequest._id}
            </span>
            <h3>
              {selectedRequest.activityType === 'job-application' ? 'Job Application Details' : 'Service Request Details'}
            </h3>
            <p className="sub">Received on {new Date(selectedRequest.createdAt).toLocaleDateString()}</p>

            <div style={{ marginTop: "24px" }}>
              <div className="modal-row" style={{ marginBottom: "16px" }}>
                <div>
                  <strong style={{ display: "block", fontSize: "12px", color: "var(--text-dim-light)", textTransform: "uppercase", marginBottom: "4px" }}>Full Name</strong>
                  <span style={{ fontSize: "14.5px", color: "var(--paper)" }}>{selectedRequest.name}</span>
                </div>
                <div>
                  <strong style={{ display: "block", fontSize: "12px", color: "var(--text-dim-light)", textTransform: "uppercase", marginBottom: "4px" }}>Email Address</strong>
                  <span style={{ fontSize: "14.5px", color: "var(--paper)" }}>{selectedRequest.email}</span>
                </div>
              </div>

              {selectedRequest.activityType === 'job-application' ? (
                <>
                  <div className="modal-row" style={{ marginBottom: "16px" }}>
                    <div>
                      <strong style={{ display: "block", fontSize: "12px", color: "var(--text-dim-light)", textTransform: "uppercase", marginBottom: "4px" }}>Position Applied</strong>
                      <span style={{ fontSize: "14.5px", color: "var(--paper)" }}>{selectedRequest.jobTitle}</span>
                    </div>
                    <div>
                      <strong style={{ display: "block", fontSize: "12px", color: "var(--text-dim-light)", textTransform: "uppercase", marginBottom: "4px" }}>Phone Number</strong>
                      <span style={{ fontSize: "14.5px", color: "var(--paper)" }}>{selectedRequest.phone || "N/A"}</span>
                    </div>
                  </div>

                  <div className="modal-row" style={{ marginBottom: "16px" }}>
                    <div>
                      <strong style={{ display: "block", fontSize: "12px", color: "var(--text-dim-light)", textTransform: "uppercase", marginBottom: "4px" }}>Status</strong>
                      <span style={{ fontSize: "14.5px", color: "var(--paper)" }}>{selectedRequest.status || "Pending"}</span>
                    </div>
                    <div>
                      <strong style={{ display: "block", fontSize: "12px", color: "var(--text-dim-light)", textTransform: "uppercase", marginBottom: "4px" }}>Resume</strong>
                      <button
                        className="resume-btn"
                        style={{ padding: "6px 12px", fontSize: "12px" }}
                        onClick={() => handleViewResume(selectedRequest.resumeUrl)}
                      >
                        View Resume
                      </button>
                    </div>
                  </div>

                  {selectedRequest.message && (
                    <div style={{ marginBottom: "20px" }}>
                      <strong style={{ display: "block", fontSize: "12px", color: "var(--text-dim-light)", textTransform: "uppercase", marginBottom: "4px" }}>Cover Message</strong>
                      <p style={{ fontSize: "14px", color: "var(--paper)", whiteSpace: "pre-wrap", background: "rgba(255,255,255,0.03)", padding: "12px", borderRadius: "8px", border: "1px solid var(--line-light)", margin: 0, lineHeight: 1.5 }}>
                        {selectedRequest.message}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="modal-row" style={{ marginBottom: "16px" }}>
                    <div>
                      <strong style={{ display: "block", fontSize: "12px", color: "var(--text-dim-light)", textTransform: "uppercase", marginBottom: "4px" }}>Company Name</strong>
                      <span style={{ fontSize: "14.5px", color: "var(--paper)" }}>{selectedRequest.companyName || "N/A"}</span>
                    </div>
                    <div>
                      <strong style={{ display: "block", fontSize: "12px", color: "var(--text-dim-light)", textTransform: "uppercase", marginBottom: "4px" }}>Phone Number</strong>
                      <span style={{ fontSize: "14.5px", color: "var(--paper)" }}>{selectedRequest.phone || "N/A"}</span>
                    </div>
                  </div>

                  <div className="modal-row" style={{ marginBottom: "16px" }}>
                    <div>
                      <strong style={{ display: "block", fontSize: "12px", color: "var(--text-dim-light)", textTransform: "uppercase", marginBottom: "4px" }}>Service Required</strong>
                      <span style={{ fontSize: "14.5px", color: "var(--paper)" }}>{selectedRequest.serviceRequired}</span>
                    </div>
                    <div>
                      <strong style={{ display: "block", fontSize: "12px", color: "var(--text-dim-light)", textTransform: "uppercase", marginBottom: "4px" }}>Status</strong>
                      <span style={{ fontSize: "14.5px", color: "var(--paper)" }}>{selectedRequest.status}</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <strong style={{ display: "block", fontSize: "12px", color: "var(--text-dim-light)", textTransform: "uppercase", marginBottom: "4px" }}>Project Description</strong>
                    <p style={{ fontSize: "14px", color: "var(--paper)", whiteSpace: "pre-wrap", background: "rgba(255,255,255,0.03)", padding: "12px", borderRadius: "8px", border: "1px solid var(--line-light)", margin: 0, lineHeight: 1.5 }}>
                      {selectedRequest.projectDescription}
                    </p>
                  </div>
                </>
              )}
            </div>

            <button 
              className="btn-primary" 
              style={{ width: "100%", justifyContent: "center", marginTop: "12px" }}
              onClick={() => setSelectedRequest(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}