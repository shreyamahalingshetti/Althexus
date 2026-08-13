import { useState, useEffect } from "react";
import "./ServiceRequests.css";

export default function ServiceRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const token = localStorage.getItem("adminToken");

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/service-requests?limit=100`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to retrieve service requests");
      }
      const data = await response.json();
      setRequests(data.data || []);
    } catch (err) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [API_BASE_URL, token]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/service-requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Update local state
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status: newStatus } : req))
      );
    } catch (err) {
      alert(err.message || "Error updating status");
    }
  };

  return (
    <div className="service-page">
      <div className="page-card">
        {loading ? (
          <div style={{ color: "var(--text-dim-light)", padding: "40px 0", textAlign: "center" }}>
            Loading service requests...
          </div>
        ) : error ? (
          <div style={{ color: "#ef4444", padding: "40px 0", textAlign: "center" }}>
            {error}
          </div>
        ) : requests.length === 0 ? (
          <div style={{ color: "var(--text-dim-light)", padding: "40px 0", textAlign: "center" }}>
            No service requests found.
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Company Name</th>
                <th>Phone Number</th>
                <th>Service Required</th>
                <th>Project Description</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req, i) => (
                <tr key={req._id}>
                  <td>{i + 1}</td>
                  <td>{req.name}</td>
                  <td>{req.email}</td>
                  <td>{req.companyName || "N/A"}</td>
                  <td>{req.phone || "N/A"}</td>
                  <td>{req.serviceRequired}</td>
                  <td style={{ maxWidth: "300px", whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: "1.4" }}>
                    {req.projectDescription}
                  </td>
                  <td>
                    <select
                      className="status-dropdown"
                      value={req.status}
                      onChange={(e) => handleStatusChange(req._id, e.target.value)}
                    >
                      <option value="New">New</option>
                      <option value="Completed">Completed</option>
                    </select>
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