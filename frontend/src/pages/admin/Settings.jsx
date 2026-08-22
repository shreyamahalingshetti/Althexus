import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import "./Settings.css";

export default function Settings() {
  const [companyName, setCompanyName] = useState("");
  const [tagline, setTagline] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Social Links
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const { refreshSettings } = useSettings();

  // Auto-hide toast after 4 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

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
        const website = links.find((l) => l.platform?.toLowerCase() === "website")?.url || "";
        const linkedIn = links.find((l) => l.platform?.toLowerCase() === "linkedin")?.url || "";
        const instagram = links.find((l) => l.platform?.toLowerCase() === "instagram")?.url || "";
        const facebook = links.find((l) => l.platform?.toLowerCase() === "facebook")?.url || "";
        const twitter = links.find((l) => l.platform?.toLowerCase() === "x (twitter)" || l.platform?.toLowerCase() === "twitter" || l.platform?.toLowerCase() === "x")?.url || "";
        const youtube = links.find((l) => l.platform?.toLowerCase() === "youtube")?.url || "";
        const whatsapp = links.find((l) => l.platform?.toLowerCase() === "whatsapp")?.url || "";

        setWebsiteUrl(website);
        setLinkedinUrl(linkedIn);
        setInstagramUrl(instagram);
        setFacebookUrl(facebook);
        setTwitterUrl(twitter);
        setYoutubeUrl(youtube);
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
          { platform: "Website", url: websiteUrl },
          { platform: "LinkedIn", url: linkedinUrl },
          { platform: "Instagram", url: instagramUrl },
          { platform: "Facebook", url: facebookUrl },
          { platform: "X (Twitter)", url: twitterUrl },
          { platform: "YouTube", url: youtubeUrl },
          { platform: "WhatsApp", url: whatsappUrl },
        ].filter(link => link.url && link.url.trim() !== ""),
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

      await refreshSettings();
      setSuccess("Settings updated successfully!");
      showToast("Changes saved successfully!", "success");
    } catch (err) {
      setError(err.message || "Failed to save settings");
      showToast(err.message || "Failed to save settings", "error");
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
                <label>Website URL</label>
                <input
                  type="url"
                  placeholder="https://althexus.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
              </div>
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
            </div>

            <div className="settings-grid-3">
              <div>
                <label>Facebook URL</label>
                <input
                  type="url"
                  placeholder="https://facebook.com/..."
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                />
              </div>
              <div>
                <label>X (Twitter) URL</label>
                <input
                  type="url"
                  placeholder="https://x.com/..."
                  value={twitterUrl}
                  onChange={(e) => setTwitterUrl(e.target.value)}
                />
              </div>
              <div>
                <label>YouTube URL</label>
                <input
                  type="url"
                  placeholder="https://youtube.com/..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="settings-grid-3">
              <div>
                <label>WhatsApp URL</label>
                <input
                  type="url"
                  placeholder="https://wa.me/..."
                  value={whatsappUrl}
                  onChange={(e) => setWhatsappUrl(e.target.value)}
                />
              </div>
              <div></div>
              <div></div>
            </div>

            <button type="submit">Save Changes</button>
          </form>
        )}
      </div>

      {toast.show && (
        <div className={`settings-toast ${toast.type}`}>
          <div className="settings-toast-icon">
            {toast.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          </div>
          <div className="settings-toast-message">{toast.message}</div>
          <button 
            type="button"
            className="settings-toast-close" 
            onClick={() => setToast({ show: false, message: "", type: "" })}
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
