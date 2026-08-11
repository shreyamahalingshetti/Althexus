import logo from "../assets/logo.jpeg";
import { useSettings } from "../context/SettingsContext";

export default function Hero() {
  const { settings } = useSettings();

  return (
    <section className="hero" id="home">
      <div className="wrap hero-inner hero-two-col">
        {/* Left: text content */}
        <div className="hero-left-col">
          <div className="eyebrow on-dark"><span className="dot"></span>WELCOME TO</div>
          <h1>{settings.companyName}</h1>
          <h2 className="sub">{settings.tagline}</h2>
          <p className="lede">{settings.aboutText}</p>
          <div className="hero-ctas">
            <a href="#services" className="btn-primary">Explore Services →</a>
            <a href="#contact" className="btn-ghost">Contact Us</a>
          </div>
        </div>

        {/* Right: floating logo circle */}
        <div className="hero-right-col">
          <div className="hero-glow-ring">
            <div className="hero-glow-ring-inner">
              <img src={logo} alt={`${settings.companyName} logo`} className="hero-logo-img" />
            </div>
          </div>
          {/* Orbiting dots */}
          <span className="orbit-dot od1"></span>
          <span className="orbit-dot od2"></span>
          <span className="orbit-dot od3"></span>
        </div>
      </div>
    </section>
  );
}
