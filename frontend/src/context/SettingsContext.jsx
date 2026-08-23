// src/context/SettingsContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const defaultSettings = {
  companyName: "ALTHEXUS",
  tagline: "Innovative Software Solutions for Modern Businesses",
  aboutText:
    "Althexus Pvt. Ltd. is a modern technology company focused on building secure, scalable, and user-friendly digital solutions. We help startups and enterprises accelerate growth through innovative software, cloud services, and intelligent technologies.",
  email: "althexusofficial@gmail.com",
  address: "Meerut, Uttar Pradesh\nRemote-First Company",
  socialLinks: [],
};

const getCachedSettings = () => {
  try {
    const cached = localStorage.getItem("althexus_settings");
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.error("Error reading settings from cache:", e);
  }
  return defaultSettings;
};

const SettingsContext = createContext({
  settings: defaultSettings,
  loading: true,
  refreshSettings: () => {},
});

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(getCachedSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings`);
      if (!response.ok) {
        throw new Error(`Failed to fetch settings (Status: ${response.status})`);
      }
      const data = await response.json();
      // Merge with defaultSettings in case backend has missing fields
      const mergedSettings = {
        companyName: data.companyName || defaultSettings.companyName,
        tagline: data.tagline || defaultSettings.tagline,
        aboutText: data.aboutText || defaultSettings.aboutText,
        email: data.email || defaultSettings.email,
        phone: data.phone || "",
        address: data.address || defaultSettings.address,
        socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : [],
      };
      setSettings(mergedSettings);
      try {
        localStorage.setItem("althexus_settings", JSON.stringify(mergedSettings));
      } catch (e) {
        console.error("Error caching settings:", e);
      }
    } catch (err) {
      console.error("Settings fetch error, falling back to defaults:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
