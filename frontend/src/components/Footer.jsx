import { useSettings } from "../context/SettingsContext";

export default function Footer() {
  const { settings } = useSettings();
  const year = new Date().getFullYear();

  const addressLines = (settings.address || "Meerut, Uttar Pradesh\nRemote-First Company").split("\n");

  return (
    <footer>
      <div className="footer-content">
        <div>
          <h2>{settings.companyName}</h2>
          <p>{settings.tagline}</p>
          <br />
          <p>Empowering businesses with innovative digital solutions.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <a href="#home">Home</a>
          <br />
          <a href="#about">About</a>
          <br />
          <a href="#services">Services</a>
          <br />
          <a href="#contact">Contact</a>
        </div>

        <div>
          <h3>Connect</h3>
          <p>Email:</p>
          <p>{settings.email}</p>
          <br />
          {addressLines.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      </div>

      <hr />

      <p className="copyright">
        © {year} {settings.companyName} Pvt. Ltd. All Rights Reserved.
      </p>
    </footer>
  );
}
