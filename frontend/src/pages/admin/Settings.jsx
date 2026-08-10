import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";

export default function Settings() {
  const navigate = useNavigate();
  const { refreshSettings } = useSettings();
  const [formData, setFormData] = useState({
    companyName: "",
    tagline: "",
    aboutText: "",
    email: "",
    phone: "",
    address: "",
    socialLinks: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const API_BASE_URL = "http://localhost:5000";

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    if (!token) return navigate("/login");

    try {
      const response = await fetch(`${API_BASE_URL}/api/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        return navigate("/login");
      }

      if (!response.ok) throw new Error("Failed to load settings");

      const data = await response.json();
      setFormData({
        companyName: data.companyName || "",
        tagline: data.tagline || "",
        aboutText: data.aboutText || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : [],
      });
    } catch (err) {
      setError(err.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleAddSocialLink = () => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: "", url: "" }],
    }));
  };

  const handleRemoveSocialLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const handleSocialLinkChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.socialLinks];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, socialLinks: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMessage("");

    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const response = await fetch(`${API_BASE_URL}/api/settings`, {
        method: "PUT",
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

      if (!response.ok) throw new Error("Failed to update settings");

      const updated = await response.json();
      setFormData({
        companyName: updated.companyName || "",
        tagline: updated.tagline || "",
        aboutText: updated.aboutText || "",
        email: updated.email || "",
        phone: updated.phone || "",
        address: updated.address || "",
        socialLinks: Array.isArray(updated.socialLinks) ? updated.socialLinks : [],
      });
      setSuccessMessage("Settings saved successfully! Changes are now live on the website.");
      // 🔄 Refresh global settings so ALL components update instantly
      refreshSettings();
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      setError(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: "10px", maxWidth: "800px" }}>
      <h1 style={{ color: "#ffffff", marginBottom: "25px", fontSize: "28px" }}>Company Settings</h1>

      {loading ? (
        <div style={{ color: "#9ca3af", padding: "40px 0", fontSize: "16px" }}>Loading settings...</div>
      ) : error ? (
        <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "10px", padding: "20px", color: "#ef4444", marginBottom: "20px" }}>
          <p style={{ margin: "0 0 15px 0" }}>{error}</p>
          <button onClick={fetchSettings} style={{ padding: "8px 16px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Retry</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "14px", padding: "30px" }}>
          {successMessage && (
            <div style={{ background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#34d399", padding: "12px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px", fontWeight: "600" }}>
              {successMessage}
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", color: "#9ca3af", marginBottom: "8px", fontSize: "14px" }}>Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "8px", color: "#fff", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "#9ca3af", marginBottom: "8px", fontSize: "14px" }}>Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "8px", color: "#fff", outline: "none", boxSizing: "border-box" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", color: "#9ca3af", marginBottom: "8px", fontSize: "14px" }}>About Text</label>
            <textarea
              rows={4}
              value={formData.aboutText}
              onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
              style={{ width: "100%", padding: "10px 14px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "8px", color: "#fff", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", color: "#9ca3af", marginBottom: "8px", fontSize: "14px" }}>Contact Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "8px", color: "#fff", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "#9ca3af", marginBottom: "8px", fontSize: "14px" }}>Contact Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "8px", color: "#fff", outline: "none", boxSizing: "border-box" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{ display: "block", color: "#9ca3af", marginBottom: "8px", fontSize: "14px" }}>Office Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              style={{ width: "100%", padding: "10px 14px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "8px", color: "#fff", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {/* Social Links Section */}
          <div style={{ marginBottom: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <label style={{ color: "#ffffff", fontSize: "16px", fontWeight: "600" }}>Social Media Links</label>
              <button
                type="button"
                onClick={handleAddSocialLink}
                style={{ padding: "6px 12px", background: "rgba(59, 130, 246, 0.2)", color: "#60a5fa", border: "1px solid rgba(59, 130, 246, 0.4)", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}
              >
                + Add Social Link
              </button>
            </div>

            {formData.socialLinks.length === 0 ? (
              <div style={{ color: "#6b7280", fontSize: "14px", fontStyle: "italic" }}>No social media links added yet.</div>
            ) : (
              formData.socialLinks.map((link, idx) => (
                <div key={idx} style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "center" }}>
                  <input
                    type="text"
                    placeholder="Platform (e.g. LinkedIn, Twitter)"
                    value={link.platform}
                    onChange={(e) => handleSocialLinkChange(idx, "platform", e.target.value)}
                    style={{ flex: "1", padding: "8px 12px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "6px", color: "#fff", outline: "none" }}
                  />
                  <input
                    type="url"
                    placeholder="URL (https://...)"
                    value={link.url}
                    onChange={(e) => handleSocialLinkChange(idx, "url", e.target.value)}
                    style={{ flex: "2", padding: "8px 12px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "6px", color: "#fff", outline: "none" }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSocialLink(idx)}
                    style={{ padding: "8px 12px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              padding: "12px 28px",
              background: "#3b82f6",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? "Saving Changes..." : "Save Settings"}
          </button>
        </form>
      )}
    </div>
  );
}