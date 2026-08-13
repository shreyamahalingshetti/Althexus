import { useState, useEffect } from "react";
import "./DashboardHome.css";

export default function DashboardHome({ setActivePage }) {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalServices: 0,
    totalServiceRequests: 0,
    totalJobOpenings: 0,
    totalJobApplications: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const token = localStorage.getItem("adminToken");

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

        // Fetch recent service requests
        const requestsRes = await fetch(`${API_BASE_URL}/service-requests?limit=100`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!requestsRes.ok) {
          throw new Error("Failed to load recent activity");
        }
        const requestsData = await requestsRes.json();
        
        // Filter requests created today
        const isToday = (dateString) => {
          const date = new Date(dateString);
          const today = new Date();
          return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          );
        };
        const todayRequests = (requestsData.data || []).filter((req) => isToday(req.createdAt));
        setRecentActivity(todayRequests);
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
                  <td>{act.serviceRequired}</td>
                  <td>
                    <span className={`status-pill status-${act.status === 'Completed' ? 'completed' : 'pending'}`}>
                      {act.status}
                    </span>
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

      {/* Modal for viewing complete request details */}
      {selectedRequest && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSelectedRequest(null); }}>
          <div className="modal" style={{ maxWidth: "600px" }}>
            <button className="modal-close" onClick={() => setSelectedRequest(null)}>✕</button>
            
            <span className="tag-id">Request ID: {selectedRequest._id}</span>
            <h3>Service Request Details</h3>
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