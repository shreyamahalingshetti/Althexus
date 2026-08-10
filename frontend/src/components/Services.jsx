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

const staticServices = [
  {
    id: 1,
    icon: "web",
    title: "Web Development",
    description: "Custom, high-performance websites and web apps built with modern frameworks like React, Next.js, and Node.js.",
    btn: "Get Started",
  },
  {
    id: 2,
    icon: "mobile",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps for iOS and Android using Flutter, React Native, and more.",
    btn: "Learn More",
  },
  {
    id: 3,
    icon: "software",
    title: "Custom Software",
    description: "End-to-end software solutions tailored to your business workflows, integrations, and scalability needs.",
    btn: "Learn More",
  },
  {
    id: 4,
    icon: "cloud",
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure, deployment pipelines, and DevOps services on AWS, Azure, and GCP.",
    btn: "Learn More",
  },
  {
    id: 5,
    icon: "ai",
    title: "AI & Machine Learning",
    description: "Intelligent automation, predictive analytics, and ML models that bring data-driven insights to your business.",
    btn: "Learn More",
  },
  {
    id: 6,
    icon: "security",
    title: "Cybersecurity",
    description: "Comprehensive security audits, penetration testing, and secure architecture design to protect your systems.",
    btn: "Learn More",
  },
];

export default function Services() {
  const [ref, visible] = useReveal();
  const serviceList = staticServices;

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

        {/* Service Grid */}
        <div className="service-grid">
          {serviceList.map((service, i) => {
            const iconKey = (service.icon || service.type || "").toLowerCase();
            const Icon = iconMap[iconKey] || Globe;
            return (
              <div
                className={`service-card ${i === 0 ? "featured" : ""}`}
                key={service.id || i}
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