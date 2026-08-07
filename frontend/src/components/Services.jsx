import useReveal from "../hooks/useReveal";
import { services } from "../data";
import {
  Globe,
  Smartphone,
  Code2,
  Cloud,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import "./Services.css";

const iconMap = {
  web: Globe,
  mobile: Smartphone,
  software: Code2,
  cloud: Cloud,
  security: ShieldCheck,
};

export default function Services() {
  const [ref, visible] = useReveal();

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

        {/* Services Grid */}
        <div className="service-grid">
          {services.map((service, i) => {
            const Icon = iconMap[service.type] || Globe;

            return (
              <div
                className={`service-card ${i === 0 ? "featured" : ""}`}
                key={i}
              >
                <div className="service-icon">
                  <Icon size={30} />
                </div>

                <h3>{service.title}</h3>

                <p>{service.text}</p>

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