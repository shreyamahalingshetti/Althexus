// src/context/SettingsContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:5000";

const defaultSettings = {
  companyName: "ALTHEXUS",
  tagline: "Innovative Software Solutions for Modern Businesses",
  aboutText:
    "Althexus Pvt. Ltd. is a modern technology company focused on building secure, scalable, and user-friendly digital solutions. We help startups and enterprises accelerate growth through innovative software, cloud services, and intelligent technologies.",
  email: "althexusofficial@gmail.com",
  address: "Meerut, Uttar Pradesh\nRemote-First Company",
  socialLinks: [
    { platform: "LinkedIn", url: "https://www.linkedin.com/company/althexus/" },
    { platform: "Instagram", url: "https://www.instagram.com/althexusofficial/" },
    { platform: "WhatsApp", url: "https://wa.me/message/SV64GDK3P6ZKP1" },
  ],
};

const SettingsContext = createContext({
  settings: defaultSettings,
  loading: true,
});

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/settings`);
        if (!response.ok) {
          throw new Error(`Failed to fetch settings (Status: ${response.status})`);
        }
        const data = await response.json();
        // Merge with defaultSettings in case backend has missing fields
        setSettings({
          companyName: data.companyName || defaultSettings.companyName,
          tagline: data.tagline || defaultSettings.tagline,
          aboutText: data.aboutText || defaultSettings.aboutText,
          email: data.email || defaultSettings.email,
          phone: data.phone || "",
          address: data.address || defaultSettings.address,
          socialLinks:
            Array.isArray(data.socialLinks) && data.socialLinks.length > 0
              ? data.socialLinks
              : defaultSettings.socialLinks,
        });
      } catch (err) {
        console.error("Settings fetch error, falling back to defaults:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
