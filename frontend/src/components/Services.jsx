import { useState, useEffect } from "react";
import useReveal from "../hooks/useReveal";
import {
  Globe,
  Smartphone,
  Code2,
  Cloud,
  ShieldCheck,
  ArrowRight,
  Cpu,
  Database,
  Lock,
  Palette,
  Megaphone,
  Settings as SettingsIcon,
} from "lucide-react";
import "./Services.css";

const iconMap = {
  web: Globe,
  mobile: Smartphone,
  software: Code2,
  cloud: Cloud,
  security: ShieldCheck,
  ai: Cpu,
  ml: Database,
  design: Palette,
  marketing: Megaphone,
  automation: SettingsIcon,
};

const API_BASE_URL = "http://localhost:5000";

export default function Services() {
  const [ref, visible] = useReveal();
  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/services?limit=50`);
        if (!response.ok) {
          throw new Error(`Failed to fetch services (Status: ${response.status})`);
        }
        const resData = await response.json();
        setServiceList(resData.data || []);
      } catch (err) {
        console.error("Services fetch error:", err);
        setError(err.message || "Unable to load services");
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return (
    <section
      id="services"
      ref={ref}
      className={`services-section reveal ${visible ? "in-view" : ""}`}
    >
      <div className="services-container">

        {/* Header */}
        <div className="services-header">
          <span className="section-tag">OUR SERVICES</span>

          <h2>
            Technology Solutions <span>We Offer</span>
          </h2>

          <p>
            We provide end-to-end digital solutions that help startups,
            businesses, and enterprises grow through innovation, automation,
            and scalable technology.
          </p>
        </div>

        {/* Loading / Error / Empty / Service Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af", fontSize: "16px" }}>
            Loading services...
          </div>
        ) : error ? (
          <div style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "10px",
            padding: "20px",
            color: "#ef4444",
            textAlign: "center",
            maxWidth: "500px",
            margin: "0 auto 40px",
          }}>
            <p style={{ margin: "0 0 10px 0" }}>{error}</p>
          </div>
        ) : serviceList.length === 0 ? (
          <div style={{
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "12px",
            padding: "40px",
            textAlign: "center",
            color: "#9ca3af",
            border: "1px dashed rgba(255, 255, 255, 0.1)",
            marginBottom: "40px",
          }}>
            No services listed right now — check back soon.
          </div>
        ) : (
          <div className="service-grid">
            {serviceList.map((service, i) => {
              const iconKey = (service.icon || service.type || "").toLowerCase();
              const Icon = iconMap[iconKey] || Globe;

              return (
                <div
                  className={`service-card ${i === 0 ? "featured" : ""}`}
                  key={service._id || i}
                >
                  <div className="service-icon">
                    <Icon size={30} />
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.description || service.text}</p>

                  <a href="#contact" className="service-btn">
                    {service.btn || "Learn More"}
                    <ArrowRight size={18} />
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="services-cta">
          <h3>Need a custom solution for your business?</h3>
          <a href="#contact" className="primary-btn">
            Let's Build Together
            <ArrowRight size={18} />
          </a>
        </div>

      </div>
    </section>
  );
}