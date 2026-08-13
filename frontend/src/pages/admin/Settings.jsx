import { useState, useEffect } from "react";
import "./Settings.css";

export default function Settings() {
  const [companyName, setCompanyName] = useState("");
  const [tagline, setTagline] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Social Links
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/settings`);
        if (!response.ok) {
          throw new Error("Failed to load settings");
        }
        const data = await response.json();
        setCompanyName(data.companyName || "");
        setTagline(data.tagline || "");
        setAboutText(data.aboutText || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setAddress(data.address || "");

        // Find individual URLs from socialLinks array
        const links = data.socialLinks || [];
        const linkedIn = links.find((l) => l.platform === "LinkedIn")?.url || "";
        const instagram = links.find((l) => l.platform === "Instagram")?.url || "";
        const whatsapp = links.find((l) => l.platform === "WhatsApp")?.url || "";

        setLinkedinUrl(linkedIn);
        setInstagramUrl(instagram);
        setWhatsappUrl(whatsapp);
      } catch (err) {
        setError(err.message || "Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [API_BASE_URL]);

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        companyName,
        tagline,
        aboutText,
        email,
        phone,
        address,
        socialLinks: [
          { platform: "LinkedIn", url: linkedinUrl },
          { platform: "Instagram", url: instagramUrl },
          { platform: "WhatsApp", url: whatsappUrl },
        ],
      };

      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      setSuccess("Settings updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to save settings");
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-card">
        <h2>Global Settings</h2>

        {loading ? (
          <div style={{ color: "var(--text-dim-light)", padding: "10px 0" }}>Loading settings...</div>
        ) : (
          <form onSubmit={handleSave}>
            {error && (
              <div style={{ color: "#ef4444", marginBottom: "15px", fontSize: "14px" }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{ color: "#10b981", marginBottom: "15px", fontSize: "14px" }}>
                {success}
              </div>
            )}

            <div className="settings-section-title">Company Info</div>
            <div className="settings-row">
              <div>
                <label>Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label>About Description</label>
              <textarea
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                rows={4}
              />
            </div>

            <div className="settings-section-title">Contact Information</div>
            <div className="settings-row">
              <div>
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label>Office Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
              />
            </div>

            <div className="settings-section-title">Social Links</div>
            <div className="settings-grid-3">
              <div>
                <label>LinkedIn URL</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/company/..."
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                />
              </div>
              <div>
                <label>Instagram URL</label>
                <input
                  type="url"
                  placeholder="https://instagram.com/..."
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                />
              </div>
              <div>
                <label>WhatsApp URL</label>
                <input
                  type="url"
                  placeholder="https://wa.me/..."
                  value={whatsappUrl}
                  onChange={(e) => setWhatsappUrl(e.target.value)}
                />
              </div>
            </div>

            <button type="submit">Save Changes</button>
          </form>
        )}
      </div>
    </div>
  );
}
