import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardHome() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to load dashboard statistics (Status: ${response.status})`);
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const cards = [
    { title: "Total Projects", count: stats?.totalProjects ?? 0, icon: "📁", color: "#3b82f6" },
    { title: "Total Services", count: stats?.totalServices ?? 0, icon: "🛠️", color: "#10b981" },
    { title: "Total Service Requests", count: stats?.totalServiceRequests ?? 0, icon: "📋", color: "#8b5cf6" },
    { title: "Total Job Openings", count: stats?.totalJobOpenings ?? 0, icon: "💼", color: "#ec4899" },
    { title: "Total Job Applications", count: stats?.totalJobApplications ?? 0, icon: "📄", color: "#06b6d4" },
  ];

  return (
    <div style={{ padding: "10px" }}>
      <h1 style={{ color: "#ffffff", marginBottom: "25px", fontSize: "28px" }}>Dashboard</h1>

      {loading ? (
        <div style={{ color: "#9ca3af", padding: "40px 0", fontSize: "16px" }}>
          Loading dashboard statistics...
        </div>
      ) : error ? (
        <div
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "10px",
            padding: "20px",
            color: "#ef4444",
            maxWidth: "500px",
          }}
        >
          <p style={{ margin: "0 0 15px 0", fontWeight: "600" }}>{error}</p>
          <button
            onClick={fetchStats}
            style={{
              padding: "8px 16px",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Retry
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "14px",
                padding: "24px",
                display: "flex",
                alignItems: "center",
                gap: "18px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  background: `${card.color}22`,
                  width: "56px",
                  height: "56px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {card.icon}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "14px", color: "#9ca3af", fontWeight: "500" }}>
                  {card.title}
                </h3>
                <p style={{ margin: "6px 0 0 0", fontSize: "28px", fontWeight: "700", color: "#ffffff" }}>
                  {card.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}