import { useSettings } from "../context/SettingsContext";

export default function Footer() {
  const { settings } = useSettings();
  const year = new Date().getFullYear();

  const addressLines = (settings.address || "Meerut, Uttar Pradesh\nRemote-First Company").split("\n");

  return (
    <footer>
      <div className="foot-grid">
        <div className="foot-brand">
          <h2>{settings.companyName}</h2>
          <p>{settings.tagline}</p>
          <p style={{ marginTop: "16px", color: "var(--text-dim)" }}>
            Empowering businesses with innovative digital solutions.
          </p>
        </div>

        <div className="foot-col">
          <h4>Quick Links</h4>
          <a href="/#home">Home</a>
          <a href="/#about">About</a>
          <a href="/#services">Services</a>
          <a href="/#contact">Contact</a>
          <a href="/careers">Careers</a>
        </div>

        <div className="foot-col">
          <h4>Connect</h4>
          <p>
            Email:{" "}
            <a
              href={`mailto:${settings.email}`}
              style={{
                display: "inline",
                color: "#38bdf8",
                textDecoration: "underline",
                transition: "color 0.2s ease",
              }}
            >
              {settings.email}
            </a>
          </p>
          {addressLines.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      </div>

      <div className="foot-bottom">
        <p className="copyright">
          © {year} {settings.companyName} Pvt. Ltd. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
