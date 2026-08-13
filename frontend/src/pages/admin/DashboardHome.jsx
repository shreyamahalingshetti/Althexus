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
        const requestsRes = await fetch(`${API_BASE_URL}/service-requests?limit=5`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!requestsRes.ok) {
          throw new Error("Failed to load recent activity");
        }
        const requestsData = await requestsRes.json();
        setRecentActivity(requestsData.data || []);
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
    { icon: "👥", label: "Total Visitors", value: 342, color: "green" },
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}