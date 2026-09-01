import useReveal from "../hooks/useReveal";
import aboutImg from "../assets/about.jpg";
import { Lightbulb, Handshake, ShieldCheck, ArrowRight } from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import "./About.css";

export default function About() {
  const [ref, visible] = useReveal();
  const { settings } = useSettings();

  return (
    <section
      id="about"
      ref={ref}
      className={`about-section reveal ${visible ? "in-view" : ""}`}
    >
      <div className="about-container">

        {/* Top Section: Side-by-side Image and Main Intro */}
        <div className="about-top">
          {/* Left Image */}
          <div className="about-image-wrapper">
            <div className="about-image-glow"></div>
            <img src={aboutImg} alt={`${settings.companyName} workspace`} className="about-image" />

            <div className="experience-badge">
              <h3>3+</h3>
              <p>Years Experience</p>
            </div>
          </div>

          {/* Right Content */}
          <div className="about-content">

            <div className="section-tag">ABOUT US</div>

            <h2 className="about-title">
              Empowering Businesses <br />
              Through <span>Technology</span>
            </h2>

            <p className="about-text">
              {settings.aboutText}
            </p>

            <p className="about-text secondary">
              From web and mobile applications to automation and business
              platforms, our team combines creativity, strategy, and engineering
              excellence to deliver real business impact.
            </p>

            {/* CTA Buttons */}
            <div className="about-actions">
              <a href="#inquiry" className="primary-btn">
                Get Started
                <ArrowRight size={18} />
              </a>

              <a href="#services" className="secondary-btn">
                Explore Services
              </a>
            </div>

          </div>
        </div>

        {/* Bottom Section: Full-Width Stats & Feature Cards */}
        <div className="about-bottom">

          {/* Stats Grid */}
          <div className="about-stats">
            <div>
              <h3>50+</h3>
              <p>Projects</p>
            </div>
            <div>
              <h3>20+</h3>
              <p>Clients</p>
            </div>
            <div>
              <h3>99%</h3>
              <p>Satisfaction</p>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="about-cards">

            <div className="about-card">
              <div className="card-icon">
                <Lightbulb size={28} />
              </div>
              <h4>Innovation</h4>
              <p>
                Creative ideas transformed into powerful digital products.
              </p>
            </div>

            <div className="about-card">
              <div className="card-icon">
                <Handshake size={28} />
              </div>
              <h4>Partnership</h4>
              <p>
                We collaborate closely with clients for long-term success.
              </p>
            </div>

            <div className="about-card">
              <div className="card-icon">
                <ShieldCheck size={28} />
              </div>
              <h4>Trust & Security</h4>
              <p>
                Reliable, scalable, and secure solutions built with modern
                technologies and best practices.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}