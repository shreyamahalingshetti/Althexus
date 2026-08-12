import { useSettings } from "../context/SettingsContext";
import "./Hero.css";

export default function Hero() {
  const { settings } = useSettings();

  return (
    <section className="hero">
      <div className="wrap hero-inner"></div>

      {/* Background overlay */}
      <div className="hero-overlay"></div>

      <div className="hero-container">

        <div className="hero-content">

          {/* Existing company content */}
          <div className="hero-welcome">
            <span className="hero-dot"></span>
            WELCOME TO
          </div>

          <h1>{settings.companyName}</h1>

          <h2 className="hero-subtitle">
            {settings.tagline}
          </h2>

          <p className="hero-description">
            {settings.aboutText}
          </p>

          {/* Existing actions */}
          <div className="hero-ctas">

            <a href="#services" className="hero-primary-btn">
              Explore Services →
            </a>

            <a href="#contact" className="hero-secondary-btn">
              Contact Us
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}