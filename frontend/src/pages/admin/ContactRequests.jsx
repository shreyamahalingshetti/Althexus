import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactRequests() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalDocuments: 0 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const API_BASE_URL = "http://localhost:5000";

  const fetchContacts = useCallback(
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
        });

        const response = await fetch(`${API_BASE_URL}/api/contacts?${queryParams}`, {
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
          throw new Error(`Failed to fetch contact inquiries (Status: ${response.status})`);
        }

        const resData = await response.json();
        setContacts(resData.data || []);
        setPagination(resData.pagination || { currentPage: 1, totalPages: 1, totalDocuments: 0 });
      } catch (err) {
        setError(err.message || "Error loading contact inquiries");
      } finally {
        setLoading(false);
      }
    },
    [navigate, search]
  );

  useEffect(() => {
    fetchContacts(1);
  }, [fetchContacts]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact message?")) return;

    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    setActionLoadingId(id);
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts/${id}`, {
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
        throw new Error("Failed to delete contact inquiry");
      }

      setContacts((prev) => prev.filter((item) => item._id !== id));
      setPagination((prev) => ({ ...prev, totalDocuments: Math.max(0, prev.totalDocuments - 1) }));
    } catch (err) {
      alert(err.message || "Failed to delete inquiry");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h1 style={{ color: "#ffffff", marginBottom: "25px", fontSize: "28px" }}>Contact Requests</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name, email, or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "10px 14px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "8px",
            color: "#ffffff",
            fontSize: "14px",
            outline: "none",
          }}
        />
      </div>

      {loading ? (
        <div style={{ color: "#9ca3af", padding: "40px 0", fontSize: "16px" }}>
          Loading contact inquiries...
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
            onClick={() => fetchContacts(pagination.currentPage)}
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
      ) : contacts.length === 0 ? (
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
          No contact messages found.
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
                  <th style={{ padding: "14px 16px" }}>Sender</th>
                  <th style={{ padding: "14px 16px" }}>Subject</th>
                  <th style={{ padding: "14px 16px" }}>Message</th>
                  <th style={{ padding: "14px 16px" }}>Date</th>
                  <th style={{ padding: "14px 16px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr
                    key={c._id}
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <td style={{ padding: "14px 16px", fontWeight: "600" }}>
                      <div>{c.name}</div>
                      <div style={{ fontSize: "12px", color: "#9ca3af" }}>{c.email}</div>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#60a5fa", fontWeight: "500" }}>{c.subject}</td>
                    <td style={{ padding: "14px 16px", color: "#d1d5db", maxWidth: "350px", wordBreak: "break-word" }}>
                      {c.message}
                    </td>
                    <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "13px" }}>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "14px 16px", textAlign: "right" }}>
                      <button
                        onClick={() => handleDelete(c._id)}
                        disabled={actionLoadingId === c._id}
                        style={{
                          padding: "6px 12px",
                          background: "#ef4444",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "600",
                          opacity: actionLoadingId === c._id ? 0.6 : 1,
                        }}
                      >
                        Delete
                      </button>
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
                  onClick={() => fetchContacts(pagination.currentPage - 1)}
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
                  onClick={() => fetchContacts(pagination.currentPage + 1)}
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