import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function ServiceRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalDocuments: 0 });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const API_BASE_URL = "http://localhost:5000";

  const fetchRequests = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const queryParams = new URLSearchParams({
          page,
          limit: 10,
          search,
          status: statusFilter,
        });

        const response = await fetch(`${API_BASE_URL}/api/service-requests?${queryParams}`, {
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
          throw new Error(`Failed to fetch service requests (Status: ${response.status})`);
        }

        const resData = await response.json();
        setRequests(resData.data || []);
        setPagination(resData.pagination || { currentPage: 1, totalPages: 1, totalDocuments: 0 });
      } catch (err) {
        setError(err.message || "Error loading service requests");
      } finally {
        setLoading(false);
      }
    },
    [navigate, search, statusFilter]
  );

  useEffect(() => {
    fetchRequests(1);
  }, [fetchRequests]);

  const handleMarkCompleted = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    setActionLoadingId(id);
    try {
      const response = await fetch(`${API_BASE_URL}/api/service-requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Completed" }),
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        return navigate("/login");
      }

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedItem = await response.json();
      setRequests((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: updatedItem.status || "Completed" } : item))
      );
    } catch (err) {
      alert(err.message || "Failed to update request");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service request?")) return;

    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    setActionLoadingId(id);
    try {
      const response = await fetch(`${API_BASE_URL}/api/service-requests/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        return navigate("/login");
      }

      if (!response.ok) {
        throw new Error("Failed to delete request");
      }

      setRequests((prev) => prev.filter((item) => item._id !== id));
      setPagination((prev) => ({ ...prev, totalDocuments: Math.max(0, prev.totalDocuments - 1) }));
    } catch (err) {
      alert(err.message || "Failed to delete request");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h1 style={{ color: "#ffffff", marginBottom: "25px", fontSize: "28px" }}>Service Requests</h1>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search by name, company, or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: "240px",
            padding: "10px 14px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "8px",
            color: "#ffffff",
            fontSize: "14px",
            outline: "none",
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "10px 14px",
            background: "#0d1b2a",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "8px",
            color: "#ffffff",
            fontSize: "14px",
            cursor: "pointer",
            outline: "none",
          }}
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <div style={{ color: "#9ca3af", padding: "40px 0", fontSize: "16px" }}>
          Loading service requests...
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
            onClick={() => fetchRequests(pagination.currentPage)}
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
      ) : requests.length === 0 ? (
        <div
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "12px",
            padding: "40px",
            textAlign: "center",
            color: "#9ca3af",
            border: "1px dashed rgba(255, 255, 255, 0.1)",
          }}
        >
          No service requests found.
        </div>
      ) : (
        <>
          <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "rgba(255, 255, 255, 0.03)",
                color: "#ffffff",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ background: "rgba(255, 255, 255, 0.08)", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                  <th style={{ padding: "14px 16px" }}>Client</th>
                  <th style={{ padding: "14px 16px" }}>Contact</th>
                  <th style={{ padding: "14px 16px" }}>Company</th>
                  <th style={{ padding: "14px 16px" }}>Service</th>
                  <th style={{ padding: "14px 16px" }}>Status</th>
                  <th style={{ padding: "14px 16px" }}>Date</th>
                  <th style={{ padding: "14px 16px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr
                    key={req._id}
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                      transition: "0.2s",
                    }}
                  >
                    <td style={{ padding: "14px 16px", fontWeight: "600" }}>{req.name}</td>
                    <td style={{ padding: "14px 16px", color: "#9ca3af" }}>
                      <div>{req.email}</div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>{req.phone}</div>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#d1d5db" }}>{req.companyName || "—"}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          background: "rgba(59, 130, 246, 0.15)",
                          color: "#60a5fa",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                      >
                        {req.serviceRequired}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                          background: req.status === "Completed" ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                          color: req.status === "Completed" ? "#34d399" : "#fbbf24",
                        }}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "13px" }}>
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "14px 16px", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                        {req.status !== "Completed" && (
                          <button
                            onClick={() => handleMarkCompleted(req._id)}
                            disabled={actionLoadingId === req._id}
                            style={{
                              padding: "6px 12px",
                              background: "#10b981",
                              color: "#fff",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "12px",
                              fontWeight: "600",
                              opacity: actionLoadingId === req._id ? 0.6 : 1,
                            }}
                          >
                            Mark Completed
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(req._id)}
                          disabled={actionLoadingId === req._id}
                          style={{
                            padding: "6px 12px",
                            background: "#ef4444",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "600",
                            opacity: actionLoadingId === req._id ? 0.6 : 1,
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justify: "space-between",
                alignItems: "center",
                marginTop: "20px",
                color: "#9ca3af",
                fontSize: "14px",
              }}
            >
              <div>
                Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalDocuments} items)
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => fetchRequests(pagination.currentPage - 1)}
                  disabled={pagination.currentPage <= 1}
                  style={{
                    padding: "6px 14px",
                    background: pagination.currentPage <= 1 ? "rgba(255,255,255,0.05)" : "#1f2937",
                    color: pagination.currentPage <= 1 ? "#4b5563" : "#fff",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "6px",
                    cursor: pagination.currentPage <= 1 ? "not-allowed" : "pointer",
                  }}
                >
                  Previous
                </button>
                <button
                  onClick={() => fetchRequests(pagination.currentPage + 1)}
                  disabled={pagination.currentPage >= pagination.totalPages}
                  style={{
                    padding: "6px 14px",
                    background: pagination.currentPage >= pagination.totalPages ? "rgba(255,255,255,0.05)" : "#1f2937",
                    color: pagination.currentPage >= pagination.totalPages ? "#4b5563" : "#fff",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "6px",
                    cursor: pagination.currentPage >= pagination.totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}