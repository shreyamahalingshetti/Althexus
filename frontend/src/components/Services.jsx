import { useState } from "react";
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
  Palette,
  Megaphone,
  Settings as SettingsIcon,
  Search,
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

/* ==========================================
   EXISTING SERVICES
   DO NOT REMOVE THESE
========================================== */

const staticServices = [
  {
    id: 1,
    icon: "web",
    title: "Web Development",
    description:
      "Custom, high-performance websites and web apps built with modern frameworks like React, Next.js, and Node.js.",
    btn: "Get Started",
  },
  {
    id: 2,
    icon: "mobile",
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile apps for iOS and Android using Flutter, React Native, and more.",
    btn: "Learn More",
  },
  {
    id: 3,
    icon: "software",
    title: "Custom Software",
    description:
      "End-to-end software solutions tailored to your business workflows, integrations, and scalability needs.",
    btn: "Learn More",
  },
  {
    id: 4,
    icon: "cloud",
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure, deployment pipelines, and DevOps services on AWS, Azure, and GCP.",
    btn: "Learn More",
  },
  {
    id: 5,
    icon: "ai",
    title: "AI & Machine Learning",
    description:
      "Intelligent automation, predictive analytics, and ML models that bring data-driven insights to your business.",
    btn: "Learn More",
  },
  {
    id: 6,
    icon: "security",
    title: "Cybersecurity",
    description:
      "Comprehensive security audits, penetration testing, and secure architecture design to protect your systems.",
    btn: "Learn More",
  },
];

/* ==========================================
   7 CORE SERVICES
========================================== */

const coreServices = [
  {
    id: 1,
    icon: Globe,
    title: "Web Development",
    shortDescription: "Modern websites built for your business.",
    description:
      "We build responsive, fast, and scalable websites that create a strong digital presence for businesses, startups, and organizations.",
    points: [
      "Business & Corporate Websites",
      "Responsive Web Applications",
      "Modern Web Technologies",
    ],
  },
  {
    id: 2,
    icon: Smartphone,
    title: "Application Development",
    shortDescription: "Powerful applications built around your needs.",
    description:
      "We develop user-focused applications designed to solve real business problems and provide smooth experiences across devices.",
    points: [
      "Web Applications",
      "Mobile Applications",
      "Custom Application Solutions",
    ],
  },
  {
    id: 3,
    icon: Search,
    title: "SEO & Ranking",
    shortDescription: "Improve your visibility and reach online.",
    description:
      "We help businesses improve their online visibility through search engine optimization strategies focused on sustainable growth.",
    points: [
      "On-Page SEO",
      "Technical SEO",
      "Search Visibility Optimization",
    ],
  },
  {
    id: 4,
    icon: Megaphone,
    title: "Digital Marketing",
    shortDescription: "Reach the right audience at the right time.",
    description:
      "We create digital marketing strategies that help businesses connect with their audience, build awareness, and generate meaningful growth.",
    points: [
      "Social Media Marketing",
      "Digital Campaigns",
      "Online Promotion",
    ],
  },
  {
    id: 5,
    icon: Palette,
    title: "Design & Branding",
    shortDescription: "Build a strong and memorable brand.",
    description:
      "We create clean, consistent, and engaging visual experiences that help businesses communicate their identity effectively.",
    points: [
      "UI/UX Design",
      "Brand Identity",
      "Creative Digital Design",
    ],
  },
  {
    id: 6,
    icon: Code2,
    title: "CV & Career Services",
    shortDescription: "Present your skills with confidence.",
    description:
      "We help students and professionals create stronger career profiles with professionally structured resumes and digital career materials.",
    points: [
      "Resume / CV Development",
      "ATS-Friendly Resumes",
      "Professional Career Profiles",
    ],
  },
  {
    id: 7,
    icon: SettingsIcon,
    title: "Maintenance & Support",
    shortDescription: "Keep your digital products running smoothly.",
    description:
      "We provide ongoing technical support, updates, improvements, and maintenance to keep your website or application reliable.",
    points: [
      "Website Maintenance",
      "Bug Fixes & Updates",
      "Technical Support",
    ],
  },
];

export default function Services() {
  const [ref, visible] = useReveal();
  const serviceList = staticServices;
  const [flippedCardId, setFlippedCardId] = useState(null);

  const handleCardClick = (id) => {
    // Only toggle flip state on mobile/tablet screen sizes (e.g., width <= 1024px)
    // or touch-enabled devices
    const isTouchOrMobile =
      window.innerWidth <= 1024 ||
      window.matchMedia("(pointer: coarse)").matches;
    if (isTouchOrMobile) {
      setFlippedCardId((prevId) => (prevId === id ? null : id));
    }
  };

  return (
    <section
      id="services"
      ref={ref}
      className={`services-section reveal ${visible ? "in-view" : ""}`}
    >
      <div className="services-container">

        {/* Unified Services Header */}
        <div className="services-header">
          <span className="section-tag">OUR SERVICES</span>
          <h2>
            Seven Services. <span>One Digital Partner.</span>
          </h2>
          <p>
            Explore our seven core services designed to help businesses
            build, grow, and maintain their digital presence.
          </p>
        </div>

        {/* 7 Core Services Section */}
        <div className="core-services-section">

          {/* Core Services Grid */}

          <div className="core-services-grid">
            {coreServices.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  className={`flip-card ${flippedCardId === service.id ? "flipped" : ""}`}
                  key={service.id}
                  tabIndex="0"
                  aria-label={`${service.title} service details`}
                  onClick={() => handleCardClick(service.id)}
                >
                  <div className="flip-card-inner">

                    {/* ==================================
                        FRONT
                    ================================== */}

                    <div className="flip-card-front">

                      <div className="service-number">
                        {String(service.id).padStart(2, "0")}
                      </div>

                      <div className="core-service-icon">
                        <Icon
                          size={32}
                          strokeWidth={1.7}
                        />
                      </div>

                      <h3>{service.title}</h3>

                      <p>{service.shortDescription}</p>

                      <div className="flip-hint">
                        <span>Hover to explore</span>
                        <ArrowRight size={16} />
                      </div>

                    </div>

                    {/* ==================================
                        BACK
                    ================================== */}

                    <div className="flip-card-back">

                      <div className="service-number">
                        {String(service.id).padStart(2, "0")}
                      </div>

                      <h3>{service.title}</h3>

                      <p>{service.description}</p>

                      <ul>
                        {service.points.map((point) => (
                          <li key={point}>
                            {point}
                          </li>
                        ))}
                      </ul>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            EXISTING BOTTOM CTA
        ========================================== */}

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