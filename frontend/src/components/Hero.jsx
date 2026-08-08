import { useSettings } from "../context/SettingsContext";

export default function Hero() {
  const { settings } = useSettings();

  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <div className="eyebrow on-dark"><span className="dot"></span>WELCOME TO</div>
        <h1>{settings.companyName}</h1>
        <h2 className="sub">{settings.tagline}</h2>
        <p className="lede">{settings.aboutText}</p>
        <div className="hero-ctas">
          <a href="#services" className="btn-primary">Explore Services →</a>
          <a href="#contact" className="btn-ghost">Contact Us</a>
        </div>
      </div>
    </section>
  );
}
